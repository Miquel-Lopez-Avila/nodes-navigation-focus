import { keyCodeWheel } from 'common/enums/key-codes';

export const wheelDirection = (deltaY: number) => (deltaY > -1 ? keyCodeWheel.UP : keyCodeWheel.DOWN);
