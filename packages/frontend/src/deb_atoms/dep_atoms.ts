export const selectNodesOfFlow = selectorFamily({
  key: 'selectNodesOfFlow',
  get: (flowId: number) => ({ get }) => {
    const flows = get(flowListState)
    const flow = flows[flowId]

    if (!flow) {
      return []
    }

    return flow.nodes.flatMap((nodeId) => {
      return get(nodeState(nodeId)) || []
    })
  },
})

export const selectNode = selectorFamily<Node, string>({
  key: 'nodeState2',
  get: (nodeId) => ({ get }) => {
    const allNodes: Nodes = get(nodeListState)

    const node = allNodes.find((n) => n.id === nodeId)

    if (!node) {
      return null
    }

    const mapConnectedNode = node.connections.map((id) =>
      allNodes.find((n) => n.id === id)
    )

    return node
  },
  set: (nodeId) => ({ set, get }, newValue) => {
    const newNode = newValue as Node
    const allNodes: Nodes = get(nodeListState)
    // console.log(allNodes)

    const newNodes = allNodes.map((n) => {
      let node = n
      if (n.id === nodeId) {
        node = newNode
      }
      // const mapConnectedNode = node.connections.map((id) =>
      //   allNodes.find((n) => n.id === id)
      // )
      return { ...node }
    })
    // // console.log('newNodes:', newNodes)
    set(nodeListState, newNodes)
  },
})

export const selectAllNodes = selector({
  key: 'selectAllNodes',
  get: ({ get }) => {
    const flows = get(flowListState)

    const allNodeIds = flows.flatMap((flow) => flow.nodes)

    return allNodeIds.map((nodeId) => {
      return get(nodeState(nodeId))
    })
  },
})

interface SelectNodeConnections {
  [key: string]: {
    x: number
    y: number
  }
}

export const selectNodeConnections = selector({
  key: 'selectNodeConnections',
  get: ({ get }) => {
    const allNodes: Nodes = get(nodeListState)

    const nodeConnections = allNodes.reduce<SelectNodeConnections>(
      (coordsById, node) => {
        coordsById[node.id] = {
          id: node.id,
          x: node.x,
          y: node.y,
        }

        return coordsById
      },
      {}
    )

    return nodeConnections
  },
})

export const selectXYofNode = selectorFamily({
  key: 'selectXYofNode',
  get: (nodeIds: string[]) => ({ get }) => {
    const nodeConnections = nodeIds.reduce<SelectNodeConnections>(
      (coordsById, nodeId) => {
        const node = get(nodeState(nodeId))
        if (node) {
          coordsById[node.id] = {
            x: node.x,
            y: node.y,
          }
        }

        return coordsById
      },
      {}
    )

    return nodeConnections
  },
})

// interface ConnectionState {
//   id: string
//   width: number
//   height: number
//   input: {
//     x: number
//     y: number
//   }
//   output: {
//     x: number
//     y: number
//   }
// }

// export const connectionState = atomFamily<ConnectionState | null, string>({
//   key: 'connectionState',
//   default: null,
// })

// export const selectAllConnections = selector({
//   key: 'selectAllConnections',
//   get: ({ get }) => {
//     const allNodes: Nodes = get(nodeListState)
//     const allConnectors: ConnectionState[] = []

//     const allConnections = allNodes.flatMap((node) => {
//       const connector = get(connectionState(node.id))

//       if (!connector) {
//         return []
//       }

//       allConnectors.push(connector)

//       return node.connections.flatMap((connectedNodeId) => {
//         const target = get(connectionState(connectedNodeId))

//         if (!target) {
//           return []
//         }

//         return {
//           id: `${node.id}-${connectedNodeId}`,
//           sourceX: connector?.output.x,
//           sourceY: connector?.output.y,
//           targetX: target?.input.x,
//           targetY: target?.input.y,
//         }
//       })
//     })

//     return {
//       connectors: allConnectors,
//       connections: allConnections,
//     }
//   },
// })

// // export const enhancedFlowState = selector({
// //   key: 'enhancedFlowState',
// //   get: ({ get }) => {
// //     const flows = get(flowState)

// //     if (flows.length === 0) {
// //       return flows
// //     }

// //     const newFlows = [...flows]

// //     newFlows.map((flow) => {
// //       const newFlow = { ...flow }

// //       return newFlow.nodes.map((node) => {
// //         const newNode = { ...node }
// //         const newConnections = newNode.connections.flatMap((connection) => {
// //           const connectedNode = newFlow.nodes.find((n) => n.id === connection)
// //           if (connectedNode) {
// //             return connectedNode
// //           }

// //           return []
// //         })

// //         console.log('newNode:', newNode)
// //         newNode.connections = newConnections as Node[]
// //         return newNode.connections
// //       })
// //     })

// //     console.log('newFlows:', newFlows)
// //     return newFlows
// //   },
// // })
