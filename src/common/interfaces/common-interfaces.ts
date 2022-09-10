export interface IOperations {
  [key: string]: any
  sum: (x: number, y:number) => number,
  subtract: (x: number, y:number) => number,
}
