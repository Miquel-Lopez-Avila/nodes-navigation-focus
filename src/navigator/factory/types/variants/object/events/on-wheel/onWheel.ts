import store from 'core/store/instance/instance';
import { keyCodeWheel } from 'common/enums/key-codes';
import { wheelDirection } from 'navigator/factory/types/events-handlers/parent-events-handler/utils/helpers/helpers';
import { ITypeParams } from 'navigator/factory/types/variants/utils/interfaces';

export const onWheel = ({
  event: { deltaY }, parentConfiguration, nodeConfiguration
}: ITypeParams) => {
  const direction = wheelDirection(deltaY)
  const commonParams = {
    parentConfiguration,
    nodeConfiguration,
    sectionKey: parentConfiguration.focusKey,
    onOut: parentConfiguration.onOut,
    direction,
  }

  const actions = {
    [keyCodeWheel.UP]: () => {
      store.updateFocusedNode({ ...commonParams, newReferences: [{ name: 'order', value: nodeConfiguration.onMove[keyCodeWheel.UP] }],
      });
    },
    [keyCodeWheel.DOWN]: () => {
      store.updateFocusedNode({ ...commonParams, newReferences: [{ name: 'order', value: nodeConfiguration.onMove[keyCodeWheel.DOWN] }]});
    },
  };

  actions[direction]();
};
