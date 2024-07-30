import React from 'react';
import { ChakraProvider, theme, Flex } from '@chakra-ui/react';

import MapLayout from './components/map/MapLayout';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Flex textAlign="center" height={'100vh'}>
        <MapLayout />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
