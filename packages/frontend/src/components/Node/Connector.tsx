import React from 'react'
import { Box, Flex } from '@chakra-ui/react'

export const CONNECTOR_SIZE = 10
export const CONNECTOR_PEDDING = CONNECTOR_SIZE

interface ConnectorProps {
  type: 'input' | 'output'
  relativeX: number
  relativeY: number
  [key: string]: any
}

export default ({ relativeX, relativeY, ...props }: ConnectorProps) => {
  const extraClickSpace = CONNECTOR_PEDDING
  return (
    <Flex
      zIndex="1200"
      pos="absolute"
      w={`${CONNECTOR_SIZE + extraClickSpace}px`}
      h={`${CONNECTOR_SIZE + extraClickSpace}px`}
      top={`${relativeY - CONNECTOR_SIZE / 2 - extraClickSpace / 2}px`}
      left={`${relativeX - CONNECTOR_SIZE / 2 - extraClickSpace / 2}px`}
      cursor="pointer"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      <Box
        borderRadius="50%"
        w={`${CONNECTOR_SIZE}px`}
        h={`${CONNECTOR_SIZE}px`}
        bg="green.400"
        boxSizing="content-box"
      />
    </Flex>
  )
}
