import React from 'react'
import { Box } from '@chakra-ui/react'

export default (props) => {
  return (
    <Box bg="brand" {...props}>I'm a box using the "brand"-color from the parent theme</Box>
  )
}

