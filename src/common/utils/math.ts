import { IOperations } from 'common/interfaces/common-interfaces';

export const operations = (): IOperations => ({
  sum: (x: number, y: number) => x + y,
  subtract: (x: number, y: number) => x - y,
});
