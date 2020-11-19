import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Client as WebSocket } from 'rpc-websockets'
import isDev from 'isdev'

const websocketUrl = 'ws://localhost:8999'
const wasAutoConnected = false
let ws: WebSocket | null = null

export const useWebsocket = () => {
  const websocketRef = useRef<WebSocket | null>(null)
  const [readyState, setWebsocketState] = useState(false)

  useEffect(() => {
    if (ws === null) {
      ws = new WebSocket(websocketUrl)

      websocketRef.current = ws

      ws.on('open', (e) => {
        console.log('######websocket open')
        setWebsocketState(true)
      })

      ws.on('close', (e) => {
        console.log('######websocket close')
        setWebsocketState(false)
      })
    }
    return () => {
      if (!isDev && websocketRef.current && websocketRef.current.close) {
        websocketRef.current.close()
      }
    }
  }, [readyState])

  const getWebSocket = useCallback(() => {
    return ws
  }, [])

  return {
    getWebSocket,
    readyState,
  }
}
