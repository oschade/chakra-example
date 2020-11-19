import React, { forwardRef, MouseEvent } from 'react'
import { Box, Flex, Icon, Center } from '@chakra-ui/react'
import type { Node } from 'utils'

import { CgSmartphoneChip } from 'react-icons/cg'

export const NODE_HEIGHT = 64

interface NodeProps extends Partial<Node> {
  onClick?: (e: MouseEvent) => void
  preview?: boolean
  children?: React.ReactNode
}

export default forwardRef<HTMLDivElement, NodeProps>(
  ({ name, preview = false, children, ...props }, ref) => {
    return (
      <>
        <Flex
          ref={ref}
          pos={preview ? 'unset' : 'absolute'}
          sx={{
            // pos: 'absolute',
            padding: 1,
            bg: 'transparent',
            // borderWidth: '1px',
            // borderColor: 'green.400',
            borderStyle: 'solid',
            height: `${NODE_HEIGHT}px`,
            borderRadius: 'md',
            alignItems: 'center',
            zIndex: 100,
            userSelect: 'none',
          }}
          {...props}
        >
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
          >
            <Center width="64px">
              <Icon as={CgSmartphoneChip} />
            </Center>
            <Box flex="4" paddingRight="8" justifyContent="flex-start">
              {name?.toUpperCase()}
            </Box>
          </Flex>
          {children}
        </Flex>
      </>
    )
  }
)
