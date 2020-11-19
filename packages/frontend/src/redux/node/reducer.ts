import type { NodeState, NodeActionTypes } from './types'

// Initial State
const initialState: NodeState = {
  nodes: {
    allIds: [],
    byId: {},
  },
}

// Reducers (Modifies The State And Returns A New State)
export default (state = initialState, action: NodeActionTypes): NodeState => {
  if (action.type === 'CREATE_NODE') {
    const nodes = { ...state.nodes }

    return {
      ...state,
      nodes,
    }
  }

  return state
}
