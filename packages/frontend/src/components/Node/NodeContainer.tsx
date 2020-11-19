import React, {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useCallback,
  MouseEvent,
} from 'react'
import { Box, Flex, Icon, Center } from '@chakra-ui/react'
import Draggable from 'react-draggable'
import shallow from 'zustand/shallow'

import { set } from 'immer/dist/internal'
import Wire from './Wire'
import Node, { NODE_HEIGHT } from './Node'
import Connector, { CONNECTOR_SIZE, CONNECTOR_PEDDING } from './Connector'
import theme from '../../theme'
import { useStore } from '../../zustand'
import { compareByKey, compareElementsOfArray } from '../../helper'

const areConnectionsEqual: typeof shallow = (objA, objB) => {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */

  const previousState = objA as any[]
  const nextState = objB as any[]

  if (previousState.length !== nextState.length) {
    return false
  }

  return previousState.every((prevConnections, i) => {
    const nextConnections = nextState[i]
    return compareElementsOfArray(prevConnections, nextConnections, (a, b) =>
      compareByKey(a, b, ['id', 'x', 'y', 'isSelected'])
    )
  })
}

/**
 * calculates the coords of the input connector
 */
const caluclateCoordsOfInputConnector = (nodeX: number, nodeY: number) => {
  const relativeX = (CONNECTOR_SIZE / 2 + CONNECTOR_PEDDING) * -1
  const relativeY = NODE_HEIGHT / 2

  return {
    relativeX,
    relativeY,
    x: nodeX + relativeX,
    y: nodeY + relativeY,
  }
}

type NodeProps = {
  nodeId: string
}

export default ({ nodeId }: NodeProps) => {
  /**
   * ref the node DOM element here to calculate width
   */
  const ref = useRef<HTMLInputElement>(null)
  /**
   * if node was moved
   */
  const wasMoved = useRef(false)
  const [nodeSize, setNodeSize] = useState({ width: 0, height: 0 })

  /**
   * gets and set node data
   */
  const node = useStore(
    useCallback((store) => store.nodes.find((n) => n.id === nodeId), [nodeId])
  )
  const setStore = useStore((store) => store.set)
  const setNode = useStore((store) => store.setNode)
  const setActiveConnector = useStore((store) => store.setActiveConnector)
  const unselectAll = useStore((store) => store.unselectAll)

  const connections = useStore(
    useCallback(
      (store) => {
        if (!node) {
          return []
        }
        return node.connections.map((connection, index) =>
          connection.flatMap((connectedNodeId) => {
            const connectedNode = store.nodes.find(
              (n) => n.id === connectedNodeId
            )
            if (!connectedNode) {
              return []
            }

            const isSelected = store.selected.wires.find((w) => {
              return (
                w.from === node.id &&
                w.to === connectedNode.id &&
                w.output === index
              )
            })

            return { ...connectedNode, isSelected }
          })
        )
      },
      [node]
    ),
    areConnectionsEqual
  )

  /**
   * state for drawing a new wire from one connector of this node to another node
   */
  const [newWire, _setNewWire] = useState({
    output: 0,
    type: 'output',
    x: 0,
    y: 0,
    initialPageX: 0,
    initialPageY: 0,
  })
  const newWireRef = useRef(newWire)

  const setNewWire = (data) => {
    newWireRef.current = data
    return _setNewWire(data)
  }

  if (!node) {
    return null
  }

  console.log('render node ', nodeId)

  /**
   * measure the dynamic width of this node
   * and save measurements in state nodeSize
   */
  useLayoutEffect(() => {
    if (!ref.current) {
      return
    }

    const boundings = ref.current.getBoundingClientRect()

    setNodeSize({
      width: boundings.width,
      height: boundings.height,
    })
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        setStore((draft) => {
          draft.selected.wires.forEach((wire) => {
            const from = draft.nodes.find((n) => n.id === wire.from)
            if (!from) {
              return
            }
            const newSet = new Set(from.connections[wire.output])
            newSet.delete(wire.to)
            from.connections[wire.output] = Array.from(newSet)
          })
        })
      }
    }
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [setStore])

  /**
   * calculate the coords of the input connector
   */
  const input = caluclateCoordsOfInputConnector(node.x, node.y)

  /**
   * calculate the coords of the output connectors
   */
  const outputs = [...Array(node.outputs)].map((v, i) => {
    const unit = CONNECTOR_SIZE + CONNECTOR_PEDDING
    const connectorPanelHeight = unit * (node.outputs - 1)
    const offset = (connectorPanelHeight - nodeSize.height) / 2
    const relativeX = nodeSize.width + CONNECTOR_SIZE / 2 + CONNECTOR_PEDDING
    const relativeY = i * unit - offset

    return {
      id: `${node.id}-output-${i}`,
      x: node.x + relativeX,
      y: node.y + relativeY,
      /**
       * x relative to node.x
       */
      relativeX,
      /**
       * y relative to node.y
       */
      relativeY,
    }
  })

  /**
   * mousemove draws a new wire
   */
  const handleMouseMove = (e: globalThis.MouseEvent) => {
    setNewWire({
      ...newWireRef.current,
      x: e.pageX,
      y: e.pageY,
    })
  }

  /**
   * mouse up adds a new connection to node
   */
  const handleMouseUp = (e: globalThis.MouseEvent) => {
    e.stopPropagation()
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)

    /**
     * add new connection
     */
    setStore((draft) => {
      const activeConnector = draft.activeConnector
      const _newWire = newWireRef.current

      /**
       * if no near connector or the activeconnector does not have the right type
       * only allow connecting output --> input and output --> input
       */
      if (activeConnector === null || activeConnector.type === _newWire.type) {
        return
      }

      let newConnection
      if (_newWire.type === 'output') {
        newConnection = {
          from: node.id,
          to: activeConnector.nodeId,
          output: _newWire.output,
        }
      } else {
        newConnection = {
          from: activeConnector.nodeId,
          to: node.id,
          output: activeConnector.output,
        }
      }

      const nodeFrom = draft.nodes.find((no) => no.id === newConnection.from)

      if (nodeFrom) {
        ;[...Array(nodeFrom.outputs)].forEach((c, i) => {
          const newConnections = new Set(nodeFrom.connections[i])

          if (i === newConnection.output) {
            newConnections.add(newConnection.to)
          }

          nodeFrom.connections[i] = Array.from(newConnections)

          draft.selected.wires[0] = {
            from: newConnection.from,
            to: newConnection.to,
            output: newConnection.output,
          }
        })
      }
    })
    setNewWire({
      type: 'output',
      output: 0,
      initialPageX: 0,
      initialPageY: 0,
      x: 0,
      y: 0,
    })
  }

  /**
   * begin to draw a wire to mouse position
   */
  const handleConnectorMouseDown = (
    e: MouseEvent,
    output: number,
    type: 'output' | 'input'
  ) => {
    // e.preventDefault()
    unselectAll()
    setNewWire({
      type,
      output,
      initialPageX: e.pageX,
      initialPageY: e.pageY,
      x: e.pageX,
      y: e.pageY,
    })
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleStop = () => {
    if (wasMoved.current === false) {
      setStore((draft) => {
        draft.selectedNode = node.id
      })
    }
    wasMoved.current = false
  }

  const handleDrag = (e, data) => {
    const newX = data.x > 0 ? data.x : 0
    const newY = data.y > 0 ? data.y : 0

    if (node.x !== newX || node.y !== newY) {
      setNode({
        ...node,
        x: newX,
        y: newY,
      })
      wasMoved.current = true
    }
  }

  const handleMouseDownOnDragable = (e) => {
    e.stopPropagation()
    unselectAll()
  }

  const handleWireClick = (
    e: React.MouseEvent<SVGPathElement, Event>,
    from: string,
    to: string,
    output: number
  ) => {
    e.stopPropagation()

    setStore((draft) => {
      draft.selected.wires[0] = {
        from,
        to,
        output,
      }
    })
  }

  /**
   * create wires between connectors
   */
  const wireColor = theme.colors.gray[500]
  const wireColorSelected = theme.colors.red[400]

  const wires = connections.flatMap((connection, output) => {
    return connection.map((connectedNode) => {
      const outputCoords = outputs[output]
      const inputCoords = caluclateCoordsOfInputConnector(
        connectedNode.x,
        connectedNode.y
      )

      return (
        <Wire
          key={`${node.id}-output-${output}-${connectedNode.id}`}
          sourceX={outputCoords.x}
          sourceY={outputCoords.y}
          targetX={inputCoords.x}
          targetY={inputCoords.y}
          color={wireColor}
          isSelected={!!connectedNode.isSelected}
          selectedColor={wireColorSelected}
          onMouseDown={(e) =>
            handleWireClick(e, node.id, connectedNode.id, output)
          }
          onMouseUp={(e) => e.stopPropagation()}
        />
      )
    })
  })

  /**
   * create a new wire after clicking one connector
   */
  let newWireComponent

  if (Math.abs(newWire.x) + Math.abs(newWire.y) > 0) {
    const coords = newWire.type === 'output' ? outputs[newWire.output] : input
    newWireComponent = (
      <Wire
        color={wireColor}
        selectedColor={wireColorSelected}
        sourceX={coords.x}
        sourceY={coords.y}
        targetX={coords.x + newWire.x - newWire.initialPageX}
        targetY={coords.y + newWire.y - newWire.initialPageY}
        isSelected
      />
    )
  }

  const outputConnectors = outputs.map((connector, i) => {
    return (
      <Connector
        key={connector.id}
        type="output"
        relativeX={connector.relativeX}
        relativeY={connector.relativeY}
        onMouseDown={(e) => handleConnectorMouseDown(e, i, 'output')}
        onMouseEnter={() =>
          setActiveConnector({ nodeId, output: i, type: 'output' })
        }
        onMouseLeave={() => setActiveConnector(null)}
      />
    )
  })

  return (
    <>
      <Box
        as="svg"
        pointerEvents="none"
        position="absolute"
        width="100%"
        height="100%"
        overflow="visible"
      >
        {wires}
        {newWireComponent}
      </Box>
      <Draggable
        bounds="parent"
        handle=".handle"
        onDrag={handleDrag}
        onMouseDown={handleMouseDownOnDragable}
        onStop={handleStop}
        defaultPosition={{ x: node.x, y: node.y }}
        grid={[25, 25]}
      >
        <Node ref={ref} {...node}>
          <Connector
            type="input"
            relativeX={input.relativeX}
            relativeY={input.relativeY}
            onMouseDown={(e) => handleConnectorMouseDown(e, 0, 'input')}
            onMouseEnter={() =>
              setActiveConnector({ nodeId, output: 0, type: 'input' })
            }
            onMouseLeave={() => setActiveConnector(null)}
          />
          {outputConnectors}
        </Node>
      </Draggable>
    </>
  )
}
