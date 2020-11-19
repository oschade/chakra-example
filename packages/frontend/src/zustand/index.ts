import create from 'zustand'
import produce from 'immer'
import type { Settings, Flows, Nodes, Node, NodeTypes } from 'utils'

interface Wire {
  from: string
  to: string
  output: number
}

interface ActiveConnector {
  nodeId: string
  output: number
  type: 'input' | 'output'
}

interface Selections {
  nodes: string[]
  wires: Wire[]
}

type State = {
  settings: Settings | null
  flows: Flows
  nodes: Nodes
  nodeTypes: NodeTypes
  activeConnector: ActiveConnector | null
  selected: Selections
  selectedNode: string
  setActiveConnector: (activeConnector: ActiveConnector | null) => void
  set: (fn: (s: State) => void) => void
  setNodes: (nodes: Nodes) => void
  setNode: (node: Node) => void
  setFlows: (flows: Flows) => void
  setSettings: (settings: Settings) => void
  unselectAll: () => void
}

export const useStore = create<State>((set) => ({
  settings: null,
  flows: [],
  nodes: [],
  nodeTypes: {},
  activeConnector: null,
  selectedNode: '0',
  selected: { wires: [], nodes: [] },
  set: (fn) => set(produce(fn)),
  setFlows: (flows) =>
    set(
      (state) =>
        produce(state, (draft) => {
          draft.flows = flows
        }),
      true
    ),
  setNodes: (nodes) =>
    set(
      (state) =>
        produce(state, (draft) => {
          draft.nodes = nodes
        }),
      true
    ),
  setNode: (newNode) =>
    set((state) =>
      produce(state, (draft) => {
        const nodeIndex = draft.nodes.findIndex((n) => n.id === newNode.id)
        if (nodeIndex < 0) {
          draft.nodes.push(newNode)
        } else {
          draft.nodes[nodeIndex] = newNode
        }
      })
    ),
  setSettings: (settings) =>
    set(
      (state) =>
        produce(state, (draft) => {
          draft.settings = settings
        }),
      true
    ),
  setActiveConnector: (activeConnector) =>
    set((state) =>
      produce(state, (draft) => {
        draft.activeConnector = activeConnector
      })
    ),
  connectNodes: (from, to) =>
    set((state) => {
      return produce(state, (draft) => {
        draft.nodes.find((n) => n.id === from)?.connections.push(to)
      })
    }),
  unselectAll: () =>
    set((state) => {
      return produce(state, (draft) => {
        draft.selected = { nodes: [], wires: [] }
      })
    }),
}))
