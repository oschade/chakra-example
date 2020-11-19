import React from 'react'
import { Flex, Box, useColorModeValue } from '@chakra-ui/react'
import { useColorMode } from '../helper'
import { useStore } from '../zustand'
import Header from './Header'

export const CANVAS_WIDTH = 10000
export const CANVAS_HEIGHT = 10000
export const CANVAS_PADDING = 48

export default (props) => {
  const unselectAll = useStore((store) => store.unselectAll)
  const mode = useColorMode()
  const backgroundColor = useColorModeValue('gray.50', 'gray.700')

  const handleClick = () => {
    unselectAll()
  }

  return (
    <Flex
      pos="relative"
      flex="1"
      bg={mode('gray.50', 'gray.700')}
      overflow="hidden"
    >
      <Box overflow="scroll" position="relative">
        <Flex
          p={`${CANVAS_PADDING}px`}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          maxWidth={CANVAS_WIDTH}
          maxHeight={CANVAS_HEIGHT}
          position="relative"
          onMouseUp={handleClick}
          {...props}
        />
      </Box>
      <Header />
    </Flex>
  )
}
