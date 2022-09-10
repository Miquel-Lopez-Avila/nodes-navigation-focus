import { ITypeParams } from 'navigator/factory/types/variants/utils/interfaces';
import { onKeyDown } from './events';
import { onWheel } from './events';

export const list = (params: ITypeParams) => ({
    keyDown: () => onKeyDown(params),
    wheel: () => onWheel(params)
});
