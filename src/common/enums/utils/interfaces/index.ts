export interface ILineDisplacement {
  [x: string]: {
    label: string;
    operation: {
      vertical?: string;
      horizontal?: string;
    };
    displacement: number;
  } | any;
}

export interface IListDisplacement {
  [x: string]: {
    label: string,
    operation: string,
    displacement: number,
  }
}

export interface IMatrixDisplacement {
  [x: string]: {
    label: string,
    operation: string,
    displacement: number,
  }
}

