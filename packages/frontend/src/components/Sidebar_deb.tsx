import React, { useState, memo, useRef, useEffect, DOMElement } from 'react'
import {
  Box,
  VStack,
  InputGroup,
  InputRightElement,
  Input,
  Icon,
  HStack,
  Flex,
  Circle,
  Center,
  BoxProps,
  forwardRef,
} from '@chakra-ui/react'
import Draggable, { DraggableEventHandler } from 'react-draggable'
import { AiOutlineSearch } from 'react-icons/ai'
import { nanoid } from 'nanoid'
import { useThrottle as useThrottledState } from '@react-hook/throttle'
import { Node } from './Node'
import { HEADER_HEIGHT } from './Header'
import { CANVAS_PADDING } from './Canvas'
import { useStore } from '../zustand'

const SIDEBAR_WIDTH = 300

const Grip = () => {
  const size = '2px'
  return (
    <Flex
      flexDir="row"
      flexWrap="wrap"
      alignItems="center"
      // alignContent="flex-start"
      py="3"
    >
      <Box>
        <Box mr={size} mb={size} width={size} height={size} bg="gray.500" />
        <Box mr={size} mb={size} width={size} height={size} bg="gray.500" />
        <Box mr={size} mb={size} width={size} height={size} bg="gray.500" />
        <Box mr={size} mb={size} width={size} height={size} bg="gray.500" />
        <Box mr={size} mb={size} width={size} height={size} bg="gray.500" />
        <Box mr={size} mb={size} width={size} height={size} bg="gray.500" />
        <Box mr={size} width={size} height={size} bg="gray.500" />
      </Box>
      <Box>
        <Box mr={size} mb={size} width={size} height={size} bg="gray.500" />
        <Box mr={size} mb={size} width={size} height={size} bg="gray.500" />
        <Box mr={size} mb={size} width={size} height={size} bg="gray.500" />
        <Box mr={size} mb={size} width={size} height={size} bg="gray.500" />
        <Box mr={size} mb={size} width={size} height={size} bg="gray.500" />
        <Box mr={size} mb={size} width={size} height={size} bg="gray.500" />
        <Box mr={size} width={size} height={size} bg="gray.500" />
      </Box>
    </Flex>
  )
}

interface NodeTypeEntryProps {
  name?: string
  onMouseDown?: (e: MouseEvent) => void
  onMouseMove?: (e: MouseEvent) => void
  onMouseUp?: (e: MouseEvent) => void
}

const NodeTypeEntry = ({ name, ...props }: NodeTypeEntryProps) => {
  return (
    <HStack cursor="move" pl="10" pr="2" bg="gray.700" {...props}>
      <Box flex="1">{name}</Box>
      <Box width="10px" height="100%">
        <Grip />
      </Box>
    </HStack>
  )
}

const NodeThumb = forwardRef<BoxProps, 'div'>((props, ref) => {
  return (
    <Center
      ref={ref}
      pos="absolute"
      top="0"
      left="0"
      width="50px"
      height="50px"
      bg="gray.700"
      boxShadow="0 0 16px rgba(0,0,0,.3)"
      zIndex="2000"
    >
      A
    </Center>
  )
})

const DraggableNode = (props) => {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleStop: DraggableEventHandler = (e, data) => {
    console.log('wup', data)
    setPos({
      x: 0,
      y: 0,
    })

    if (data.x < SIDEBAR_WIDTH - 100) {
      return
    }

    console.log('#####handle stoo')

    if (props.onStop) {
      console.log('#####handle stoo2')
      props.onStop(e, data)
    }
  }

  const handleDrag: DraggableEventHandler = (e, data) => {
    setPos({
      x: data.x,
      y: data.y,
    })

    if (props.onDrag) {
      props.onDrag(e, data)
    }
  }

  return (
    <Box>
      {/* <Draggable
        position={{ x: pos.x, y: pos.y }}
        onDrag={handleDrag}
        onStop={handleStop}
        grid={[2, 2]}
      >
        <NodeTypeEntry name={props.name} />
      </Draggable> */}
      {/* <Node name={props.name} preview /> */}
    </Box>
  )
}

export default () => {
  const [_activeNodeTypeId, _setActiveNodeType] = useState('')
  const [dragCoords, setDragCoords] = useThrottledState(
    {
      x: -1000,
      y: -1000,
    },
    60
  )

  const ref = useRef<HTMLDivElement>(null)

  const activeNodeTypeId = useRef('')

  const setActiveNodeType = (data) => {
    activeNodeTypeId.current = data
    return _setActiveNodeType(data)
  }

  // Monitor changes to position state and update DOM
  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translate(${dragCoords.x}px, ${dragCoords.y}px)`
    }
  }, [dragCoords])

  const nodeTypes = useStore((state) => state.nodeTypes)
  const setSore = useStore((state) => state.set)

  const handleMouseMove = (e: MouseEvent) => {
    // if (
    //   Math.abs(dragCoords.x - e.pageX) < 5 ||
    //   Math.abs(dragCoords.y - e.pageY) < 5
    // ) {
    //   return
    // }
    setDragCoords({
      x: e.pageX + 5,
      y: e.pageY + 5,
    })

    e.preventDefault()
  }

  const handleMouseUp = (e: MouseEvent) => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)

    setDragCoords({
      x: -1000,
      y: -1000,
    })

    const nodeType = nodeTypes.find(
      (type) => type.id === activeNodeTypeId.current
    )

    if (!nodeType) {
      return
    }

    setSore((draft) => {
      draft.nodes.push({
        id: nanoid(),
        x: Math.abs(e.pageX - SIDEBAR_WIDTH),
        y: Math.abs(e.pageY),
        connections: [],
        flow: 'test',
        icon: nodeType.icon,
        name: nodeType.displayName,
        outputs: 1,
        params: nodeType.params,
        type: nodeType.type,
      })
    })

    e.preventDefault()
  }

  const handleMouseDown = (e: MouseEvent, nodeTypeId: string) => {
    console.log('nodeTypeId:', nodeTypeId)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    setActiveNodeType(nodeTypeId)

    setDragCoords({
      x: e.pageX,
      y: e.pageY,
    })

    e.preventDefault()
  }

  const types = nodeTypes.map((nodeType) => {
    const handleStop: DraggableEventHandler = (e, data) => {
      console.log('data:', data)
      setSore((draft) => {
        draft.nodes.push({
          id: nanoid(),
          x: Math.abs(data.x - SIDEBAR_WIDTH),
          y: Math.abs(
            data.y + (data.node.offsetTop - HEADER_HEIGHT) - CANVAS_PADDING
          ),
          connections: [],
          flow: 'test',
          icon: nodeType.icon,
          name: nodeType.displayName,
          outputs: 1,
          params: nodeType.params,
          type: nodeType.type,
        })
      })
    }

    return (
      <NodeTypeEntry
        key={nodeType.id}
        name={nodeType.displayName}
        onMouseDown={(e) => handleMouseDown(e, nodeType.id)}
      />
    )
  })

  return (
    <Box as="aside" width={`${SIDEBAR_WIDTH}px`} paddingY="5" paddingX="4">
      <Box py="4">
        <InputGroup>
          <Input placeholder="search" />
          <InputRightElement>
            <Icon as={AiOutlineSearch} color="gray.500" />
          </InputRightElement>
        </InputGroup>
      </Box>
      <VStack align="stretch" spacing={2}>
        {types}
      </VStack>

      <NodeThumb ref={ref} />
    </Box>
  )
}
