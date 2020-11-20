import React from 'react'
import { Button, useColorMode } from '@chakra-ui/react'

export default (props) => {
  const { colorMode } = useColorMode()
  
  console.log('colorMode:', colorMode)

  return (
    <Button {...props} />
  )
}
