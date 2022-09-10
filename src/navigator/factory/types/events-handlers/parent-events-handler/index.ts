import { WheelEvent } from 'react';
import { addEvent } from 'common/utils/events';
import { Events } from 'common/enums/events';
import store from 'core/store/instance/instance';
import { IEvents } from 'core/store/utils/interfaces/store';
import { line, matrix, list, object } from 'navigator/factory/types/variants';
import { types } from 'common/enums/types';

const parentEventsHandler = ({ node, configuration }: IEvents) => {
  addEvent(node, Events.ON_WHEEL, (e: WheelEvent<HTMLDivElement>) => {
    const { current } = store.getFocusedNode()

    const params = {
      event: e,
      parentConfiguration: configuration,
      nodeConfiguration: current.configuration
    }

    const actions = {
        [types.LINE]: () => {
            line(params).wheel()
        },
        [types.LIST]: () => {
            list(params).wheel()
        },
        [types.MATRIX]: () => {
            matrix(params).wheel()
        },
        [types.OBJECT]: () => {
            object(params).wheel()
        },
        [types.SINGLE]: () => {},
    }

    actions[configuration.type]()
  })
}

export default parentEventsHandler
