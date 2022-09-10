import store from 'core/store/instance/instance';
import { wheelDirection } from 'navigator/factory/types/events-handlers/parent-events-handler/utils/helpers/helpers';
import { matrixWheelDisplacement } from 'common/enums/displacement/matrix';
import { operations } from 'common/utils/math';
import { keyCodeWheel } from 'common/enums/key-codes';
import { ITypeParams } from 'navigator/factory/types/variants/utils/interfaces';

export const onWheel = ({
  event: { deltaY }, parentConfiguration, nodeConfiguration
}: ITypeParams) => {
  const direction = wheelDirection(deltaY)
  const data = matrixWheelDisplacement[direction];

  const calculatedDisplacement = operations()[data.operation](
      nodeConfiguration[data.label],
      data.displacement,
  );

  const commonParams = {
    sectionKey: parentConfiguration.focusKey,
    direction,
    onOut: parentConfiguration.onOut,
  }

  const actions = {
    [keyCodeWheel.UP]: () => {
      store.updateFocusedNode({ ...commonParams, newReferences: [{ name: 'row', value: calculatedDisplacement }, { name: 'column', value: Number(nodeConfiguration.column) }] });
    },
    [keyCodeWheel.DOWN]: () => {
      store.updateFocusedNode({ ...commonParams, newReferences: [{ name: 'row', value: calculatedDisplacement }, { name: 'column', value: Number(nodeConfiguration.column) }]  });
    },
  };

  actions[direction]();
};
