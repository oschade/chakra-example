import React, { MouseEvent, useEffect } from 'react'
import { ChakraProvider, Box, Flex, Input } from '@chakra-ui/react'
import {
  RecoilRoot,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'
import { Client as WebSocket } from 'rpc-websockets'
import type { AppSettings } from 'utils'
import isDev from 'isdev'

import shallow from 'zustand/shallow'
import Header from './components/Header'
import { NodeContainer } from './components/Node'
import Canvas from './components/Canvas'
import Sidebar from './components/Sidebar'
import NodeModal from './components/NodeModal'
import SideNavigation from './components/SideNavigation'
import theme from './theme'
import { flowListState, nodeListState, settingState } from './deb_atoms'
import { useStore } from './zustand'
import { useWebsocket } from './helper'

if (!isDev) {
  /**
   * Hot reloading not working when webpack use fonts
   * Why???
   */
  // eslint-disable-next-line global-require
  require('typeface-inter')
}

const wasAutoConnected = false

const BackendContainer = () => {
  // const setSettingState = useSetRecoilState(settingState)
  // const setFlowListState = useSetRecoilState(flowListState)
  // const setNodeListState = useSetRecoilState(nodeListState)
  const setStore = useStore((store) => store.set)
  const setSettingState = useStore((store) => store.setSettings)
  const setFlowListState = useStore((store) => store.setFlows)
  const setNodeListState = useStore((store) => store.setNodes)
  const { getWebSocket, readyState } = useWebsocket()

  useEffect(() => {
    const ws = getWebSocket()

    if (!readyState || !ws) {
      return undefined
    }

    ws.call('getSettings').then((results) => {
      if (!results) {
        Error('Error while fetching settings from backend over websocket')
      }

      const data = results as AppSettings
      console.log('data:', data)

      // set nodeList first because flows.nodes are mapped to nodes
      setStore((draft) => {
        draft.flows = data.flows
        draft.nodes = data.nodes
        draft.settings = data.settings
        draft.nodeTypes = data.nodeTypes
      })
      // setNodeListState(data.nodes)
      // setFlowListState(data.flows)
      // setSettingState(data.settings)

      console.log('WSResult getSettings:', data)
    })

    return () => {
      if (!isDev) {
        ws?.close()
      }
    }
  }, [
    setFlowListState,
    setNodeListState,
    setSettingState,
    readyState,
    getWebSocket,
    setStore,
  ])

  return null
}

const App = () => {
  const flowId = 'test'
  const nodes = useStore(
    (store) => store.nodes.filter((n) => n.flow === flowId).map((n) => n.id),
    shallow
  )

  console.log('nodes:', nodes)

  const nodeComps = nodes.map((nodeId) => (
    <NodeContainer key={nodeId} nodeId={nodeId} />
  ))

  return (
    <ChakraProvider theme={theme}>
      <Input variant="underline" />
      <Flex w="100vw" h="100vh" flexDir="row">
        <BackendContainer />
        {/* <Flex flex="1" overflow="hidden"> */}
        <SideNavigation />
        <Sidebar />
        {/* <Box> */}
        <Canvas>
          {/* <SVGCanvas /> */}
          {nodeComps}
        </Canvas>
        {/* </Box> */}
        {/* </Flex> */}
      </Flex>
      <NodeModal />
    </ChakraProvider>
  )
}

export default App
