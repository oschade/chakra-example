import { Node } from 'utils'

export const CREATE_NODE = 'CREATE_NODE'

export interface NodeObject extends Node {
  updated: boolean
}

export interface NodeObjects {
  allIds: string[]
  byId: {
    [key: string]: NodeObject
  }
}

export interface NodeState {
  nodes: NodeObjects
}

export interface CreateNode {
  type: typeof CREATE_NODE
  node: Partial<Node>
}

export type NodeActionTypes = CreateNode
