import React from 'react'
import { Button, Box } from 'components'
import { useColorMode } from '@chakra-ui/react'

export default () => {
  const {toggleColorMode} = useColorMode()

  return(
    <>
      <Button onClick={toggleColorMode} >Toggle Color Mode</Button>
      {/* color "brand" comes from parent theme */}
      <Box />
    </>
  )
}