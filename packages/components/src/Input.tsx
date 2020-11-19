import React from 'react'
import { Input, useColorMode } from '@chakra-ui/react'
import { useColorMode } from './helper'


export default () => {
  const mode = useColorMode()
  const {colorMode} = useColorMode()
  
  console.log('colorMode:', colorMode)

  return (
    <Input placeholder="Basic usage" />
  )
}
