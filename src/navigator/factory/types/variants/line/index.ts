import { onKeyDown, onWheel } from './events';
import { ITypeParams } from 'navigator/factory/types/variants/utils/interfaces';

export const line = (params: ITypeParams) => ({
    keyDown: () => onKeyDown(params),
    wheel: () => onWheel(params)
});
