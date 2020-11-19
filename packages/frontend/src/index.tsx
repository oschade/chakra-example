import * as React from 'react'
import { render } from 'react-dom'
import { ColorModeScript } from '@chakra-ui/react'
import theme from './theme'
import App from './App'

const rootEl = document.getElementById('root')

render(
  <>
    <ColorModeScript initialColorMode="dark" />
    <App />
  </>,
  rootEl
)
