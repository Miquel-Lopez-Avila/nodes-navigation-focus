import { keyCodeKeyBoard, keyCodeWheel } from '../key-codes';
import { IListDisplacement } from 'common/enums/utils/interfaces';

export const listDisplacement: IListDisplacement = {
  [keyCodeKeyBoard.LEFT_ARROW]: {
    label: 'position',
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
    label: 'position',
    operation: 'sum',
    displacement: 1,
  },
};

export const listWheelDisplacement: IListDisplacement = {
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
