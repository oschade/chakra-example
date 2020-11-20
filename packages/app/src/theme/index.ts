import { extendTheme } from '@chakra-ui/react'
import colors from './foundations/colors'

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
}

const customTheme = extendTheme({
  colors,
  config,
})

export default customTheme
