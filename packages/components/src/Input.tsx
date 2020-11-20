import React from 'react'
import { Input, useColorMode } from '@chakra-ui/react'

interface Props {
  bg: string
}

export default (props: Props) => {
  const { colorMode } = useColorMode()
  
  console.log('colorMode:', colorMode)

  return (
    <Input placeholder="Basic usage" {...props} />
  )
}
