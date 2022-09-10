import store from 'core/store/instance/instance';
import { row } from 'core/config/variables';
import { wheelDirection } from 'navigator/factory/types/events-handlers/parent-events-handler/utils/helpers/helpers';
import { listWheelDisplacement } from 'common/enums/displacement/list';
import { operations } from 'common/utils/math';
import { keyCodeWheel } from 'common/enums/key-codes';
import { ITypeParams } from 'navigator/factory/types/variants/utils/interfaces';

export const onWheel = ({
  event: { deltaY }, parentConfiguration, nodeConfiguration, lastRowPosition
}: ITypeParams) => {
  const { focusKey, rememberLastRowPosition, startPosition } = parentConfiguration
  const direction = wheelDirection(deltaY)
  const data = listWheelDisplacement[direction];

  const calculatedDisplacement = operations()[data.operation](
      nodeConfiguration[data.label],
      data.displacement,
  );

  const commonParams = {
    sectionKey: focusKey,
    direction,
    onOut: parentConfiguration.onOut,
  }

  const savedPosition = lastRowPosition[calculatedDisplacement]
  const newPosition = (rememberLastRowPosition && data.label === row && savedPosition) ? savedPosition : startPosition

  const actions = {
    [keyCodeWheel.UP]: () => {
      store.updateLastRowPosition({ ...commonParams, indexRow: nodeConfiguration.row, positionToSave: nodeConfiguration.position })
      store.updateFocusedNode({ ...commonParams, newReferences: [{ name: 'row', value: calculatedDisplacement }, { name: 'position', value: newPosition }] });
    },
    [keyCodeWheel.DOWN]: () => {
      store.updateLastRowPosition({ ...commonParams, indexRow: nodeConfiguration.row, positionToSave: nodeConfiguration.position })
      store.updateFocusedNode({ ...commonParams, newReferences: [{ name: 'row', value: calculatedDisplacement }, { name: 'position', value: newPosition }] });
    },
  };

  actions[direction]();
};
