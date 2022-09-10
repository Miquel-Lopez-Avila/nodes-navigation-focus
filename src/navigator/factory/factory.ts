import { useCallback, useMemo, useRef, useId, useEffect } from 'react';
import useFocus from 'navigator/factory/hooks/use-focus';
import { IConfiguration, IFactory } from 'navigator/utils/interfaces';
import store from 'core/store/instance/instance';
import error from 'core/error-handler/errorHandler';
import useStore from 'core/store/hooks/use-store';
import { IState } from 'core/store/utils/interfaces/store';

const factory = (parent: HTMLElement | null | undefined | any, configuration: IConfiguration): IFactory => {
  const { focusKey } = configuration;

  // Checks
  if (!focusKey) error('Empty focus Key');

  // Generate random id or use current id
  const key = useMemo(() => focusKey ?? useId(), [focusKey])

  //Hooks
  const self = useRef(null);
  const state = useStore(store, useCallback((state: IState) => state, []));
  const { focused, hasFocusedChild } = useFocus(key, state);

  // Store node and inject events
  useEffect(() => {
    const hasParentNode = !!parent
    const sectionKey = hasParentNode ? parent.key : focusKey

    const data = {
      sectionKey,
      hasParentNode,
      node: self.current,
      configuration: {
        ...configuration,
        focusKey: key,
      }
    }

    store.saveNode(data);
  }, [])

  // Assign key
  self.key = key

  return {
    self,
    configuration: {
      focusKey: key,
      focused,
      hasFocusedChild,
      setFocus: (key: string) => store.setFocus(key),
      focusSelf: () => store.setFocus(key),
      getFocusedNode: () => store.getFocusedNode(),
      getPressedNode: () => store.getPressedNode(),
    }
  };
};

export default factory;
