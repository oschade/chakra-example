import { hot } from 'react-hot-loader'

import React, { useEffect, useState, useRef } from 'react'
import { ThemeProvider } from 'theme-ui'
import { Provider } from 'react-redux'
import { Client as WebSocket } from 'rpc-websockets'

import Layout from '@components/layout'
import Node from '@components/Node'
import SVG, { Circle, Line } from 'react-svg-draw'
import { store } from '@redux/store'
import theme from '../theme'

type DataProps = {
  site: {
    buildTime: string
  }
}

export interface NodeObject {
  id: string
  type: string
  name: string
  x: number
  y: number
  conections: string[]
}

const nodes: NodeObject[] = [
  {
    id: 'one',
    conections: ['two'],
    name: 'F',
    type: 'foo',
    x: 50,
    y: 50,
  },
  {
    id: 'two',
    conections: [],
    name: 'H',
    type: 'foo',
    x: 200,
    y: 50,
  },
]

const App = () => {
  const containerRef = useRef(null)
  const [content, setContent] = useState(null)

  useEffect(() => {
    // const ws = new Waterfall('ws://127.0.0.1:8999')
    // const cable = new Cable(ws)
    // console.log('send message')
    // cable.register('ping', async () => {
    //   return 'pong'
    // })
    // cable.notify('hello', { name: 'client 1' })
    const ws = new WebSocket('ws://localhost:8999')

    ws.on('open', () => {
      ws.call('sum', [5, 3]).then((result) => {
        console.log('result:', result)
      })
      ws.call('getAllFlows').then((result) => {
        console.log('result:', result)
      })
      ws.call('getReact', ['flow-plugin-inject']).then((result) => {
        console.log('result:', result)

        // setContent(eval(result))

        // setContent(
        //   ReactDOM.hydrate(result, document.getElementById('containerOne'))
        // )
      })
    })
  }, [])

  const nodeComps = nodes.map((node) => (
    <Node key={node.id} icon={node.name} _x={200} _y={50} {...node} />
  ))

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout>
          {nodeComps}
          {/* {content && React.cloneElement(content)} */}
          <SVG
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              pointerEvents: 'none',
            }}
          >
            <Circle
              style={null}
              cx={`${50 + 64}px`}
              cy={`${50 + 64 / 2}px`}
              r="8"
            />

            <Line
              style={null}
              onClick={() => console.log(23)}
              sx={{
                stroke: 'primary',
                strokeWidth: 4,
                cursor: 'pointer',
                pointerEvents: 'all',
              }}
              x1={`${50 + 64}px`}
              y1={`${50 + 64 / 2}px`}
              x2={`${200 + 64}px`}
              y2={`${50 + 64 / 2}px`}
            />
          </SVG>
        </Layout>
      </ThemeProvider>
    </Provider>
  )
}

declare let module: object

export default hot(module)(App)
