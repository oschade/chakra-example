import React from 'react'
import { Input } from 'components'
import { useColorMode, Button } from '@chakra-ui/react'

export const ToggleButton = () => {
  const {toggleColorMode} = useColorMode()

  return(
    <>
      <Button onClick={toggleColorMode} >Toggle Color Mode</Button>
      <Input bg="brand" />
    </>
  )
}