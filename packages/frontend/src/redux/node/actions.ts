import type { NodeActionTypes, NodeObject } from './types'

export const createNode = (node: NodeObject): NodeActionTypes => ({
  type: 'CREATE_NODE',
  node,
})
