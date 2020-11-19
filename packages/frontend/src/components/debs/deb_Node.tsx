import React, { useLayoutEffect, useRef, useState } from 'react'
import { Box, Flex, useColorModeValue, Icon, Center } from '@chakra-ui/react'
import Draggable from 'react-draggable'
import type { Node } from 'utils'
import { CgSmartphoneChip } from 'react-icons/cg'
import {
  useSetRecoilState,
  useRecoilState,
  useRecoilValue,
  useRecoilCallback,
} from 'recoil'
import {
  nodeListState,
  nodeState,
  settingState,
  connectorState,
  selectNodeConnections,
  selectNode,
  selectXYofNode,
} from '../atoms'

const connectorSize = 10
const connectorPadding = 2 * connectorSize + 1
const nodeHeight = 64

interface ConnectorProps {
  type: 'input' | 'output'
  [key: string]: any
}

const Connector = ({ type, ...props }: ConnectorProps) => {
  const backgroundColor = useColorModeValue('gray.50', 'gray.700')

  const positionRight = type === 'output' ? `${-connectorPadding}px` : 'auto'
  const positionLeft = type === 'input' ? `${-connectorPadding}px` : 'auto'

  return (
    <Box
      borderRadius="50%"
      w={`${connectorSize}px`}
      h={`${connectorSize}px`}
      bg="green.400"
      pos="absolute"
      borderWidth={`${connectorSize / 2}px`}
      borderColor={backgroundColor}
      boxSizing="content-box"
      right={positionRight}
      left={positionLeft}
      cursor="pointer"
      zIndex="1200"
      {...props}
    />
  )
}

interface ArrowProps {
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
  offsetX?: number
  offsetY?: number
}

const Arrow = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  offsetX = 0,
  offsetY = 0,
}: ArrowProps) => {
  const width = targetX - sourceX
  const height = targetY - sourceY

  return (
    <Box
      position="absolute"
      bg="tomato"
      left={`${sourceX + offsetX}px`}
      top={`${sourceY + offsetY}px`}
      width={`${width}px`}
      height={`${height}px`}
    />
  )
}

type NodeProps = Node

export default ({ ...props }: NodeProps) => {
  const ref = useRef<HTMLInputElement>(null)
  // const backgroundColor = useColorModeValue('white', 'tomato')
  const setActiveConnector = useSetRecoilState(connectorState)
  const [node, setNode] = useRecoilState(nodeState(nodeId))
  const [nodeSize, setNodeSize] = useState({ width: 0, height: 0 })

  if (!node) {
    return null
  }

  console.log('render node ', nodeId)

  const getXYofConnectedNodes = useRecoilCallback(({ snapshot }) => () => {
    return useRecoilValue(selectXYofNode(node.connections))
  })

  useLayoutEffect(() => {
    console.log('node ref', ref)
    if (!ref.current) {
      return
    }

    const boundings = ref.current.getBoundingClientRect()
    console.log('boundings:', boundings)

    setNodeSize({ width: boundings.width, height: boundings.height })
  }, [])

  const handleConnectorClick = (e) => {
    e.preventDefault()
    console.log('click')
  }

  const handleDrag = (e, data) => {
    setNode({
      ...node,
      x: data.x,
      y: data.y,
    })
  }

  console.log('nodeData:', node)
  const { id, x, y, name, connections } = node
  const nodeConnections = getXYofConnectedNodes()
  console.log('nodeConnections:', nodeConnections)
  const arrows = connections.flatMap((connectedNodeId) => {
    const connectedNode = nodeConnections[connectedNodeId]
    if (!connectedNode) {
      return []
    }
    // for right connector
    const sourceX = nodeSize.width - connectorSize + connectorPadding
    const sourceY = nodeHeight / 2

    const targetX = connectedNode.x - x - connectorPadding / 2
    const targetY = connectedNode.y - y + nodeHeight / 2

    return (
      <Arrow
        key={`${id}-${connectedNode}`}
        sourceX={sourceX}
        sourceY={sourceY}
        targetX={targetX}
        targetY={targetY}
      />
    )
  })

  return (
    <Draggable
      // bounds={{
      //   left: 0,
      //   top: 0,
      //   right: canvasWidth,
      //   bottom: canvasHeight,
      // }}
      bounds="parent"
      handle=".handle"
      onDrag={handleDrag}
      defaultPosition={{ x, y }}
      grid={[25, 25]}
    >
      <Flex
        ref={ref}
        sx={{
          pos: 'absolute',
          padding: 1,
          bg: 'transparent',
          // borderWidth: '1px',
          // borderColor: 'green.400',
          borderStyle: 'solid',
          height: `${nodeHeight}px`,
          borderRadius: 'md',
          alignItems: 'center',
        }}
        {...props}
      >
        {arrows}
        <Flex
          bg="#fff"
          flex="1"
          h="100%"
          color="gray.900"
          alignItems="center"
          justifyContent="center"
          borderRadius="md"
          borderColor="green.500"
          borderWidth="2px"
          boxShadow="md"
          className="handle"
          cursor="move"
          ref={ref}
        >
          <Center width="64px">
            <Icon as={CgSmartphoneChip} />
          </Center>
          <Box flex="4" paddingRight="8" justifyContent="flex-start">
            {name?.toUpperCase()}
          </Box>
        </Flex>
        <Connector type="input" onMouseDown={handleConnectorClick} />
        <Connector
          type="output"
          onMouseDown={handleConnectorClick}
          onMouseEnter={() => setActiveConnector(nodeId)}
          onMouseLeave={() => setActiveConnector(null)}
        />
      </Flex>
    </Draggable>
  )
}
