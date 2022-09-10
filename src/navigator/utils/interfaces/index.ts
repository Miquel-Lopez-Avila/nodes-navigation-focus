import { IFocusedNode, IPressedNode } from 'core/store/utils/interfaces/store';

export interface IConfiguration {
  [key: string]: any
  type?: string,
  parent?: HTMLElement,
  node?: HTMLElement,
  focusKey?: string,
  flow?: string,
  row?: number,
  column?: number,
  position?: number,
  order?: number,
  startPosition?: number,
  rememberLastFocused?: boolean,
  rememberLastRowPosition?: boolean,
  preferredChildFocusKey?: string,
  extraProps?: any,
  onOut?: IOnOut,
  onMove?: any,
  onEnterPressedNode?: (args: IConfiguration) => void,
  onArrowPress?: (key: string, args: IConfiguration) => void,
  onFocusedNode?: (args: IConfiguration) => void,
  onFocusedChildNodeChanges?: (args: IConfiguration) => void
  onBlurredNode?: (args: IConfiguration) => void
  onMouseOver?: (args: IConfiguration) => void,
  onMouseOut?: (args: IConfiguration) => void,
  onClick?: (args: IConfiguration) => void,
}

export interface IFactory {
  self: HTMLElement
  configuration: IFactoryConfiguration
}

export interface IFactoryConfiguration {
  focusKey: string,
  focused: boolean,
  hasFocusedChild: boolean,
  setFocus: (key: string) => void,
  focusSelf: () => void,
  getFocusedNode: () => IFocusedNode,
  getPressedNode: () => IPressedNode,
}


export interface IOnOut {
  right: (argsSection: IConfiguration, argsNode: IConfiguration) => void
  up: (argsSection: IConfiguration, argsNode: IConfiguration) => void
  down: (argsSection: IConfiguration, argsNode: IConfiguration) => void
  left: (argsSection: IConfiguration, argsNode: IConfiguration) => void
}
