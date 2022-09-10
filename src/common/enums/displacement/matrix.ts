import { keyCodeKeyBoard, keyCodeWheel } from '../key-codes';
import { IMatrixDisplacement } from 'common/enums/utils/interfaces';

export const matrixKeyDownDisplacement: IMatrixDisplacement = {
  [keyCodeKeyBoard.LEFT_ARROW]: {
    label: 'column',
    operation: 'subtract',
    displacement: 1,
  },
  [keyCodeKeyBoard.DOWN_ARROW]: {
    label: 'row',
    operation: 'sum',
    displacement: 1,
  },
  [keyCodeKeyBoard.UP_ARROW]: {
    label: 'row',
    operation: 'subtract',
    displacement: 1,
  },
  [keyCodeKeyBoard.RIGHT_ARROW]: {
    label: 'column',
    operation: 'sum',
    displacement: 1,
  },
};

export const matrixWheelDisplacement: IMatrixDisplacement = {
  [keyCodeWheel.UP]: {
    label: 'row',
    operation: 'subtract',
    displacement: 1,
  },
  [keyCodeWheel.DOWN]: {
    label: 'row',
    operation: 'sum',
    displacement: 1,
  },
};
