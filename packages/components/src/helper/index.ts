import {
  useColorMode as useColorModeOriginal,
  useTheme,
} from '@chakra-ui/react'

export const useColorMode = () => {
  const { colorMode } = useColorModeOriginal()
  const theme = useTheme()
  console.log('####colorMode changed:', colorMode)
  console.log('theme-color', theme)

  return <T, S>(light: T, dark: S) => {
    return colorMode === 'dark' ? dark : light
  }
}
