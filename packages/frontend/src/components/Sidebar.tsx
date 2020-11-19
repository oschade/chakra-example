import React, { useState, useRef, useEffect } from 'react'
import {
  Box,
  VStack,
  InputGroup,
  InputRightElement,
  Input,
  Icon,
  HStack,
  Flex,
  Center,
  BoxProps,
  forwardRef,
} from '@chakra-ui/react'
import { AiOutlineSearch } from 'react-icons/ai'
import { nanoid } from 'nanoid'
import { useThrottle as useThrottledState } from '@react-hook/throttle'
import { CANVAS_PADDING } from './Canvas'
import { useStore } from '../zustand'
import { SIDENAVIGATION_WIDTH } from './SideNavigation'

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

export default () => {
  const ref = useRef<HTMLDivElement>(null)
  const activeNodeTypeId = useRef('')
  const [, _setActiveNodeType] = useState('')
  const setActiveNodeType = (data) => {
    activeNodeTypeId.current = data
    return _setActiveNodeType(data)
  }

  const [dragCoords, setDragCoords] = useThrottledState(
    {
      x: -1000,
      y: -1000,
    },
    60
  )

  const nodeTypes = useStore((state) => state.nodeTypes)
  const setSore = useStore((state) => state.set)

  // Monitor changes to position state and update DOM
  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translate(${dragCoords.x}px, ${dragCoords.y}px)`
    }
  }, [dragCoords])

  const handleMouseMove = (e: MouseEvent) => {
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

    const nodeType = nodeTypes[activeNodeTypeId.current]

    if (!nodeType) {
      return
    }

    setSore((draft) => {
      draft.nodes.push({
        id: nanoid(),
        x: Math.abs(e.pageX - SIDEBAR_WIDTH - SIDENAVIGATION_WIDTH),
        y: Math.abs(e.pageY - CANVAS_PADDING),
        connections: [],
        flow: 'test',
        name: nodeType.displayName,
        outputs: 1,
        params: nodeType.params,
        type: nodeType.id,
      })
    })

    e.preventDefault()
  }

  const handleMouseDown = (e: MouseEvent, nodeTypeId: string) => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    setActiveNodeType(nodeTypeId)

    setDragCoords({
      x: e.pageX,
      y: e.pageY,
    })

    e.preventDefault()
  }

  const types = Object.keys(nodeTypes).map((nodeTypeId) => {
    const nodeType = nodeTypes[nodeTypeId]

    return (
      <NodeTypeEntry
        key={nodeType.id}
        name={nodeType.displayName}
        onMouseDown={(e) => handleMouseDown(e, nodeType.id)}
      />
    )
  })

  return (
    <Box as="aside" width={`${SIDEBAR_WIDTH}px`} paddingY="5" paddingX="2">
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
