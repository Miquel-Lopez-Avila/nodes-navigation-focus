import { keyCodeKeyBoard } from 'common/enums/key-codes';
import { listDisplacement } from 'common/enums/displacement/list';
import { operations } from 'common/utils/math';
import store from 'core/store/instance/instance';
import { row } from 'core/config/variables';
import { ITypeParams } from 'navigator/factory/types/variants/utils/interfaces';

export const onKeyDown = ({
  event: { key }, parentConfiguration, nodeConfiguration, lastRowPosition
}: ITypeParams) => {
  const { focusKey, rememberLastRowPosition, startPosition } = parentConfiguration

  const data = listDisplacement[key];
  const calculatedDisplacement = operations()[data.operation](
    nodeConfiguration[data.label],
    data.displacement,
  );

  const commonParams = {
    sectionKey: focusKey,
    direction: key,
    onOut: parentConfiguration.onOut,
  }
  const savedPosition = lastRowPosition[calculatedDisplacement]
  const newPosition = (rememberLastRowPosition && data.label === row && savedPosition) ? savedPosition : startPosition

  const actions = {
    [keyCodeKeyBoard.UP_ARROW]: () => {
      store.updateLastRowPosition({ ...commonParams, indexRow: nodeConfiguration.row, positionToSave: nodeConfiguration.position })
      store.updateFocusedNode({ ...commonParams, newReferences: [{ name: 'row', value: calculatedDisplacement }, { name: 'position', value: newPosition }] });
    },
    [keyCodeKeyBoard.LEFT_ARROW]: () => {
      store.updateFocusedNode({ ...commonParams, newReferences: [{ name: 'row', value: nodeConfiguration.row }, { name: 'position', value: calculatedDisplacement }] });
    },
    [keyCodeKeyBoard.RIGHT_ARROW]: () => {
      store.updateFocusedNode({ ...commonParams, newReferences: [{ name: 'row', value: nodeConfiguration.row }, { name: 'position', value: calculatedDisplacement }] });
    },
    [keyCodeKeyBoard.DOWN_ARROW]: () => {
      store.updateLastRowPosition({ ...commonParams, indexRow: nodeConfiguration.row, positionToSave: nodeConfiguration.position })
      store.updateFocusedNode({ ...commonParams, newReferences: [{ name: 'row', value: calculatedDisplacement }, { name: 'position', value: newPosition }] });
    }
  };

  actions[key]();
};
