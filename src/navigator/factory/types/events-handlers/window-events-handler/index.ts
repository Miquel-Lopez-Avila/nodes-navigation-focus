import store from 'core/store/instance/instance';
import { line, matrix, list, object } from 'navigator/factory/types/variants';
import { addEvent } from 'common/utils/events';
import { Events } from 'common/enums/events';
import { types } from 'common/enums/types';
import { keyCodeKeyBoard } from 'common/enums/key-codes';

const windowEventsHandler = () => {
  if (typeof window === 'undefined' || !window.addEventListener) return

  addEvent(window, Events.ON_KEY_DOWN, (e: KeyboardEvent) => {
      const { current } = store.getFocusedNode()
      const { configuration, lastRowPosition } = store.getParentConfiguration(current.configuration.focusKey ?? '')
      const { key } = e

      if (key === keyCodeKeyBoard.ENTER) {
          const callbackOnEnterPressedNode = current.configuration?.onEnterPressedNode
          if (callbackOnEnterPressedNode) callbackOnEnterPressedNode(current.configuration)
          return
      }

      const callbackOnArrowPress = current.configuration?.onArrowPress
      if (callbackOnArrowPress) callbackOnArrowPress(key, current.configuration)

      const params = {
        event: e,
        parentConfiguration: configuration,
        nodeConfiguration: current.configuration
      }

      const actions = {
          [types.LINE]: () => {
              line(params).keyDown()
          },
          [types.LIST]: () => {
              list({ ...params, lastRowPosition }).keyDown()
          },
          [types.MATRIX]: () => {
              matrix(params).keyDown()
          },
          [types.OBJECT]: () => {
              object(params).keyDown()
          },
          [types.SINGLE]: () => {},
      }

      actions[configuration.type]()
  })
}

export default windowEventsHandler
