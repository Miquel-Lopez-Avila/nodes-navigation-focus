import { IState } from './interfaces/store';

export const initialState: IState = {
  allNodes: [],
  focusedNode: {
      current: {
          sectionKey: null,
          node: null,
          configuration: null
      },
      lastFocused: {
          sectionKey: null,
          node: null,
          configuration: null
      },
  },
  pressedNode: {
      current: {
          sectionKey: null,
          node: null,
          configuration: null
      },
      lastPressed: {
          sectionKey: null,
          node: null,
          configuration: null
      },
  },
}
