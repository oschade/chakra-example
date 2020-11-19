import React from 'react'
import { Box, Flex, Center, useColorMode, Heading } from '@chakra-ui/react'
import { WidgetProvider, Input } from 'flow-components'
import { useStore } from '../zustand'

// interface NodeModalProps {}

export default () => {
  const { colorMode } = useColorMode()
  const node = useStore((store) =>
    store.nodes.find((n) => n.id === store.selectedNode)
  )

  if (!node) {
    return null
  }

  return (
    <Center
      pointerEvents="none"
      zIndex="1400"
      pos="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
    >
      <Box
        pointerEvents="all"
        w="500px"
        h="300px"
        bg="gray.800"
        boxShadow="0 0 6px rgba(0,0,0,.6)"
        borderRadius="base"
        p="6"
      >
        <WidgetProvider colorMode={colorMode} data={node.params}>
          <Input name="payload" />
          <Input name="number" />
        </WidgetProvider>
      </Box>
    </Center>
  )
}
