import React, { useEffect, useState } from 'react'
import {
  Box,
  Flex,
  HStack,
  Button,
  Switch,
  useColorMode,
} from '@chakra-ui/react'

import { Input } from 'flow-components'

import type { AppSettings } from 'utils'
import { useStore } from '../zustand'
import { useWebsocket } from '../helper'

export const HEADER_HEIGHT = 64

const Logo = () => (
  <Box
    sx={{
      fontWeight: 800,
    }}
  >
    FLOW
  </Box>
)

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { getWebSocket } = useWebsocket()
  const [isDeploying, setIsDeploying] = useState(false)

  // https://github.com/chakra-ui/chakra-ui/issues/2275#issuecomment-713030032
  // useEffect(() => {
  //   if (colorMode === '') {
  //     toggleColorMode()
  //   }
  // }, [colorMode, toggleColorMode])

  const handleDeployClick = (e) => {
    e.preventDefault()

    const ws = getWebSocket()
    console.log('ws:', ws)
    if (!ws) {
      Error('No websocket connection')
      return
    }
    console.log('click')

    const wholeState = useStore.getState()

    if (!wholeState.settings) {
      console.warn('AppSettings not synced. Is WebsocketServer running?')
      return
    }

    const appSettings: Partial<AppSettings> = {
      settings: wholeState.settings,
      nodes: wholeState.nodes,
      flows: wholeState.flows,
    }

    setIsDeploying(true)
    ws.call('deploy', appSettings).then((res) => {
      setIsDeploying(false)
      console.log('deploy res:', res)
    })
  }

  return (
    <Flex
      as="header"
      position="absolute"
      width="100%"
      h={`${HEADER_HEIGHT}px`}
      flex="1"
      px="40px"
      align="center"
      justify="space-between"
      zIndex="1000"
    >
      <Box flex="1">
        <Logo />
      </Box>

      <Input name="Hallo" />

      <HStack>
        <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
        <Button
          background="dark.800"
          _hover={{ bg: 'dark.900' }}
          onClick={handleDeployClick}
        >
          {isDeploying ? 'Deploying' : 'Deploy'}
        </Button>
      </HStack>
    </Flex>
  )
}

export default Header
