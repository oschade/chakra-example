import { useColorMode as useColorModeOriginal } from '@chakra-ui/react'

export const useColorMode = () => {
  const { colorMode } = useColorModeOriginal()
  console.log('colorMode changed:', colorMode)

  return <T, S>(light: T, dark: S) => {
    return colorMode === 'dark' ? dark : light
  }
}
