import { keyCodeKeyBoard } from 'common/enums/key-codes';
import { matrixKeyDownDisplacement } from 'common/enums/displacement/matrix';
import { operations } from 'common/utils/math';
import store from 'core/store/instance/instance';
import { ITypeParams } from 'navigator/factory/types/variants/utils/interfaces';

export const onKeyDown = ({
  event: { key }, parentConfiguration, nodeConfiguration
}: ITypeParams) => {
  const data = matrixKeyDownDisplacement[key];

  const calculatedDisplacement = operations()[data.operation](
      nodeConfiguration[data.label],
      data.displacement,
  );

  const commonParams = {
    sectionKey: parentConfiguration.focusKey,
    direction: key,
    onOut: parentConfiguration.onOut,
  }

  const actions = {
    [keyCodeKeyBoard.UP_ARROW]: () => {
      store.updateFocusedNode({ ...commonParams, newReferences: [{ name: 'row', value: calculatedDisplacement }, { name: 'column', value: Number(nodeConfiguration.column) }] });
    },
    [keyCodeKeyBoard.LEFT_ARROW]: () => {
      store.updateFocusedNode({ ...commonParams, newReferences: [{ name: 'row', value: Number(nodeConfiguration.row) }, { name: 'column', value: calculatedDisplacement }] });
    },
    [keyCodeKeyBoard.RIGHT_ARROW]: () => {
      store.updateFocusedNode({ ...commonParams, newReferences: [{ name: 'row', value: Number(nodeConfiguration.row) }, { name: 'column', value: calculatedDisplacement }] });
    },
    [keyCodeKeyBoard.DOWN_ARROW]: () => {
      store.updateFocusedNode({ ...commonParams, newReferences: [{ name: 'row', value: calculatedDisplacement }, { name: 'column', value: Number(nodeConfiguration.column) }]  });
    }
  };

  actions[key]();
};
