import { IConfiguration } from 'navigator/utils/interfaces';

export interface IState {
    allNodes: IStructureSection[],
    focusedNode: IFocusedNode,
    pressedNode: IPressedNode
}

export interface IFocusedNode {
  current: IStateNode,
  lastFocused: IStateNode,
}

export interface IPressedNode {
  current: IStateNode,
  lastPressed: IStateNode,
}

export interface IStructureSection {
    sectionKey: string;
    configuration: IConfiguration;
    childNodes: IChildNodes[];
    parent?: HTMLElement | null;
    node?: HTMLElement
    lastReferences?: INewReferences[];
    lastRowPosition?: any;
}

export interface IChildNodes {
  configuration: IConfiguration,
  node: HTMLElement
}

export interface IStateNode {
    sectionKey: string,
    node: HTMLElement | null,
    configuration: IConfiguration
}

export interface INewReferences {
  name: string,
  value: any,
}

export interface INewNodeFocused {
  node: HTMLElement,
  configuration: IConfiguration,
  sectionKey: string,
}

export interface IEvents {
  node: HTMLElement,
  configuration: IConfiguration,
}

export interface ISaveNode {
  sectionKey: string | null,
  hasParentNode: boolean,
  node: HTMLElement,
  configuration: IConfiguration,
}

export interface IAppendNode {
  node: HTMLElement,
  sectionIndex: number,
  nodeIndex: number,
  existsNode: boolean,
  existsSection: boolean,
  hasParentNode: boolean,
  configuration: IConfiguration,
  sectionKey: string
}

export interface IUpdateLastFocused {
  sectionKey: string,
  referencesToSave: any
}

export interface IUpdateFocusedNode {
  parentConfiguration?: IConfiguration,
  nodeConfiguration?: IConfiguration,
  onOut: IOnOut,
  direction: string,
  sectionKey: string,
  newReferences: any
}

export interface IOnOut {
  [key: string]: any
  right: (parentConfig: IConfiguration, nodeConfig: IConfiguration) => void
  up: (parentConfig: IConfiguration, nodeConfig: IConfiguration) => void
  down: (parentConfig: IConfiguration, nodeConfig: IConfiguration) => void
  left: (parentConfig: IConfiguration, nodeConfig: IConfiguration) => void
}

export interface IUpdateLastRowPosition {
  sectionKey: string
  indexRow: number
  positionToSave : number
}
