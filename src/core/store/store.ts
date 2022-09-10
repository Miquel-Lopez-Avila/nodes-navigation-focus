import { nonExists } from 'core/config/variables';
import windowEventsHandler from 'navigator/factory/types/events-handlers/window-events-handler';
import parentEventsHandler from 'navigator/factory/types/events-handlers/parent-events-handler';
import sonEventsHandler from 'navigator/factory/types/events-handlers/son-events-handler';
import { isNotEmpty } from 'common/utils/type-predicates';
import { compact } from 'common/utils/util-kit';
import { onOutTypes } from 'common/enums/on-out';
import {
  IAppendNode, IChildNodes,
  IEvents,
  INewNodeFocused,
  INewReferences,
  ISaveNode,
  IState,
  IStructureSection, IUpdateFocusedNode, IUpdateLastFocused, IUpdateLastRowPosition
} from './utils/interfaces/store';

const createStore = (initialState: IState) => {
  let state = initialState;
  const listeners = new Set();

  // GET
  const getState = () => state;
  const getAllNodes = () => state.allNodes;
  const getPressedNode = () => state.pressedNode;
  const getFocusedNode = () => state.focusedNode;
  const getChildNode = (section: IStructureSection, key: string) => section.childNodes.find((child: IChildNodes) => child.configuration.focusKey === key);
  const getChildByReferences = (section: IStructureSection, newReferences: INewReferences[]) => section.childNodes.find((child: IChildNodes) => (newReferences.every((reference: INewReferences) => child.configuration[reference.name] === reference.value)));
  const getParentConfiguration = (key: string) => {
    const { allNodes } = getState()

    const [{ configuration, lastRowPosition }] = compact(allNodes.map(({ childNodes, configuration, lastRowPosition }: IStructureSection) => (
        !!childNodes.find(({ configuration }) => configuration?.focusKey === key) ? {
          configuration,
          lastRowPosition
        } : null)
    ))

    return {
      configuration,
      lastRowPosition
    }
  }

  // SET
  const setFocus = (key: string) => {
    const { allNodes } = getState()

    if (isNotEmpty(allNodes)) {
        const [reference] = compact(allNodes.map((section: IStructureSection) => {
          const referenceChild = 'lastReferences' in section ? getChildByReferences(section, section.lastReferences) : getChildNode(section, section.configuration.preferredChildFocusKey)
          const defaultChild =  referenceChild ?? section.childNodes[0]
          return section.sectionKey === key ? defaultChild : getChildNode(section, key)
        }));

        if (reference) {
          const parentConfiguration = getParentConfiguration(reference?.configuration?.focusKey ?? '')

          setFocusedNode({ node: reference?.node, configuration: reference?.configuration, sectionKey: parentConfiguration.configuration.focusKey })
        }
      }
  }

  const setState = (fn: (args: IState) => any) => {
    state = fn(state);
    listeners.forEach((l: any) => l());
  }

  const setFocusedNode = (newNodeFocused: INewNodeFocused) => {
    setState((state: IState) => ({
      ...state,
      focusedNode: {
        lastFocused: state.focusedNode.current,
        current: newNodeFocused
      }
    }))
  }

  // UPDATE
  const updateFocusedNode = ({ parentConfiguration, nodeConfiguration, onOut, direction, sectionKey, newReferences }: IUpdateFocusedNode) => {
    const { allNodes } = state
    const parent = allNodes.find((section: IStructureSection) => section.sectionKey === sectionKey);
    const newFocusedNode = getChildByReferences(parent, newReferences)

    if (newFocusedNode) {
      if (parent.configuration.rememberLastFocused) updateLastFocused({ sectionKey, referencesToSave: newReferences })

      setFocusedNode({ node: newFocusedNode.node, configuration: newFocusedNode.configuration, sectionKey })
    } else {
      const callback = onOut?.[onOutTypes[direction]]

      if (callback) callback(parentConfiguration, nodeConfiguration)
    }
  }

  const updateLastRowPosition = ({ sectionKey, indexRow, positionToSave }: IUpdateLastRowPosition) => {
    setState((state: IState) => {
      const { allNodes } = state

      const sectionToUpdate = allNodes.find(section => section.sectionKey === sectionKey)
      const indexSectionToUpdate = allNodes.indexOf(sectionToUpdate)

      let copyState = [...allNodes]

      copyState[indexSectionToUpdate] = {
        ...sectionToUpdate,
        lastRowPosition: {
          ...sectionToUpdate.lastRowPosition,
          [indexRow]: positionToSave
        }
      }

      return {
        ...state,
        allNodes: copyState
      }
    })
  }

  const updateLastFocused = ({ sectionKey, referencesToSave }: IUpdateLastFocused) => {
    setState((state: IState) => {
      const { allNodes } = state

      const sectionToUpdate = allNodes.find((section: IStructureSection) => section.sectionKey === sectionKey)
      const indexSectionToUpdate = allNodes.indexOf(sectionToUpdate)

      let copyState = [...allNodes]

      copyState[indexSectionToUpdate] = {
        ...sectionToUpdate,
        lastReferences: referencesToSave
      }

      return {
        ...state,
        allNodes: copyState
      }
    })
  }

  // EVENTS
  const initWindowEvents = () => {
    windowEventsHandler()
  }

  const injectEvents = (hasParentNode: boolean, { ...rest }: IEvents) => {
    if (hasParentNode) sonEventsHandler(rest);
    else parentEventsHandler(rest)
  }

  // STORING & UPDATING REFS
  const saveNode = ({ sectionKey = null, hasParentNode, node, configuration }: ISaveNode) => {
    const { allNodes } = getState()
    const sectionIndex = allNodes.findIndex(section => section.sectionKey === sectionKey);
    const existsSection = sectionIndex !== nonExists
    const nodeIndex = existsSection ? allNodes[sectionIndex].childNodes.findIndex(node => node.configuration.focusKey === configuration.focusKey) : nonExists
    const existsNode = existsSection ? nodeIndex !== nonExists : false

    injectEvents(hasParentNode,{ node, configuration });

    appendNode({
      node,
      sectionIndex,
      nodeIndex,
      hasParentNode,
      configuration,
      sectionKey,
      existsSection,
      existsNode,
    })
  }

  const appendNode = ({ node, sectionIndex, nodeIndex, existsNode, existsSection, hasParentNode, configuration, sectionKey }: IAppendNode) => {
    setState((state: IState) => {
      const { allNodes } = state
      let copyState = [...allNodes]

      const variants = [
        {
          condition: hasParentNode && existsNode,
          format: () => {
            copyState[sectionIndex] = {...copyState[sectionIndex], node, configuration}
          },
        }, {
          condition: !hasParentNode && existsNode,
          format: () => {
            copyState[sectionIndex].childNodes[nodeIndex] = { ...copyState[sectionIndex].childNodes[nodeIndex], node, configuration }
          },
        }, {
          condition: !hasParentNode && existsSection,
          format: () => {
            copyState[sectionIndex] = { ...copyState[sectionIndex], node, configuration }
          },
        }, {
          condition: hasParentNode && existsSection,
          format: () => {
            copyState[sectionIndex] = { ...copyState[sectionIndex], childNodes: [...copyState[sectionIndex].childNodes, { configuration, node }] }
          },
        }, {
          condition: hasParentNode && !existsSection,
          format: () => {
            copyState = [ ...copyState, { sectionKey, node: null, configuration: null, lastRowPosition: {}, childNodes: [{ configuration, node }] }]
          },
        }, {
          condition: !hasParentNode && !existsSection,
          format: () => {
            copyState = [ ...copyState, { sectionKey, node, configuration, childNodes: [] }]
          },
        }]

      variants.forEach(({ condition, format }) => condition && format())

      return {
        ...state,
        allNodes: copyState,
      }
    })
  }

  // SUBSCRIBER
  const subscribe = (listener: any) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  // INIT EVENTS
  initWindowEvents()

  return {
    getState,
    setState,
    getAllNodes,
    getPressedNode,
    getFocusedNode,
    getParentConfiguration,
    setFocus,
    updateFocusedNode,
    updateLastRowPosition,
    saveNode,
    subscribe
  }
}

export default createStore
