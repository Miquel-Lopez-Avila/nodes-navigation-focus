import { keyCodeKeyBoard } from 'common/enums/key-codes';
import store from 'core/store/instance/instance';
import { ITypeParams } from 'navigator/factory/types/variants/utils/interfaces';

export const onKeyDown = ({
  event: { key }, parentConfiguration, nodeConfiguration
}: ITypeParams) => {
  const commonParams = {
    type: parentConfiguration.type,
    sectionKey: parentConfiguration.focusKey,
    direction: key,
    onOut: parentConfiguration.onOut,
  }

  const actions = {
    [keyCodeKeyBoard.UP_ARROW]: () => {
      store.updateFocusedNode({ ...commonParams, newReferences: [{ name: 'order', value: nodeConfiguration.onMove[keyCodeKeyBoard.UP_ARROW] }] });
    },
    [keyCodeKeyBoard.LEFT_ARROW]: () => {
      store.updateFocusedNode({ ...commonParams, newReferences: [{ name: 'order', value: nodeConfiguration.onMove[keyCodeKeyBoard.LEFT_ARROW] }]   });
    },
    [keyCodeKeyBoard.RIGHT_ARROW]: () => {
      store.updateFocusedNode({ ...commonParams, newReferences: [{ name: 'order', value: nodeConfiguration.onMove[keyCodeKeyBoard.RIGHT_ARROW] }]  });
    },
    [keyCodeKeyBoard.DOWN_ARROW]: () => {
      store.updateFocusedNode({ ...commonParams, newReferences: [{ name: 'order', value: nodeConfiguration.onMove[keyCodeKeyBoard.DOWN_ARROW] }]  });
    }
  };

  actions[key]();
};
