import { onKeyDown, onWheel } from 'navigator/factory/types/variants/object/events';
import { ITypeParams } from 'navigator/factory/types/variants/utils/interfaces';

export const object = (params: ITypeParams) => ({
    keyDown: () => onKeyDown(params),
    wheel: () => onWheel(params)
});
