import { extendTheme } from '@chakra-ui/react'
import colors from './foundations/colors'
import { InputStyle } from './components/forms'

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
}

const customTheme = extendTheme({
  colors,
  config,
  components: {
    Input: InputStyle,
  },
})

export default customTheme
