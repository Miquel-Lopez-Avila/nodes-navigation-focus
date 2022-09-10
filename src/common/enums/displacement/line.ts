import { keyCodeKeyBoard, keyCodeWheel } from '../key-codes';
import { ILineDisplacement } from 'common/enums/utils/interfaces';

export const lineDisplacement: ILineDisplacement = {
  [keyCodeKeyBoard.LEFT_ARROW]: {
    label: 'position',
    operation: {
      horizontal: 'subtract',
    },
    displacement: 1,
  },
  [keyCodeKeyBoard.DOWN_ARROW]: {
    label: 'position',
    operation: {
      vertical: 'sum',
    },
    displacement: 1,
  },
  [keyCodeKeyBoard.UP_ARROW]: {
    label: 'position',
    operation: {
      vertical: 'subtract',
    },
    displacement: 1,
  },
  [keyCodeKeyBoard.RIGHT_ARROW]: {
    label: 'position',
    operation: {
      horizontal: 'sum',
    },
    displacement: 1,
  },
};

export const lineWheelDisplacement: ILineDisplacement = {
  [keyCodeWheel.UP]: {
    label: 'position',
    operation: {
      vertical: 'subtract',
    },
    displacement: 1,
  },
  [keyCodeWheel.DOWN]: {
    label: 'position',
    operation: {
      vertical: 'sum',
    },
    displacement: 1,
  },
};
