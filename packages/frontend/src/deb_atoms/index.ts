/* eslint-disable @typescript-eslint/no-array-constructor */
import { atom, selector, selectorFamily, atomFamily } from 'recoil'
import type { RecoilState } from 'recoil'
import type { Settings, Flows, Nodes } from 'utils'

export const settingState = atom({
  key: 'settingState',
  default: null,
}) as RecoilState<Settings | null>

export const flowListState = atom({
  key: 'flowListState',
  default: new Array(),
}) as RecoilState<Flows>

export const nodeListState = atom({
  key: 'nodeListState',
  default: new Array(),
}) as RecoilState<Nodes>

export const nodeState = atomFamily({
  key: 'nodeState',
  default: selectorFamily({
    key: 'nodeState/Default',
    get: (nodeId) => ({ get }) => {
      const allNodes: Nodes = get(nodeListState)

      const node = allNodes.find((n) => n.id === nodeId)

      if (!node) {
        return null
      }

      return {
        ...node,
      }
    },
  }),
})

export const activeConnectorState = atom({
  key: 'activeConnectorState',
  default: null,
}) as RecoilState<string | null>

export const selectConnectedNodes = selectorFamily({
  key: 'selectNodesForCanvas',
  get: (nodeIds: string[] | undefined) => ({ get }) => {
    if (!nodeIds) {
      return []
    }
    const allNodes = nodeIds.flatMap((nodeId) => {
      return get(nodeState(nodeId)) || []
    })

    return allNodes
  },
})
