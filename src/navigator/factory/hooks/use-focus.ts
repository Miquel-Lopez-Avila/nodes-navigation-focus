import { useEffect, useState } from 'react';
import store from 'core/store/instance/instance';
import { IState } from 'core/store/utils/interfaces/store'

const useFocus = (key: string, state: IState) => {
  const [focused, setFocused] = useState(false)
  const [hasFocusedChild, setHasFocusedChild] = useState(false)

  useEffect(() => {
      const { current } = store.getFocusedNode()
      const currentSectionKey = current?.sectionKey
      const currentFocusKey = current?.configuration?.focusKey
      const configuration = current?.configuration

      const isSameSection = key === currentSectionKey
      const isCurrentFocusElement = key === currentFocusKey
      const currentState = focused && configuration?.onBlurredNode

      if ((isSameSection && isCurrentFocusElement) || (isCurrentFocusElement && !isSameSection)) {
          const parentConfiguration = store.getParentConfiguration(currentFocusKey ?? '')

          if (configuration?.onFocusedNode) configuration?.onFocusedNode(configuration)
          if (parentConfiguration?.configuration?.onFocusedChildNodeChanges) parentConfiguration?.configuration?.onFocusedChildNodeChanges(configuration)

          setFocused(true)
      }
      else if (isSameSection && !isCurrentFocusElement) setHasFocusedChild(true)
      else if (currentState && !(isSameSection && isCurrentFocusElement) || (isCurrentFocusElement && !isSameSection)) configuration?.onBlurredNode(configuration)

      return () => {
          setFocused(false)
          setHasFocusedChild(false)
      }
  }, [state.focusedNode.current])

  return { focused, hasFocusedChild }
};

export default useFocus;
