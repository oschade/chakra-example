import React from 'react';
import theme from './theme'
import Test  from './Test'
import { ChakraProvider, Box } from '@chakra-ui/react'


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Test />
    </ChakraProvider>
  );
}

export default App;
