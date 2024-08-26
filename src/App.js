import React, { useEffect } from 'react';
import { ChakraProvider, theme, Flex } from '@chakra-ui/react';

import MapLayout from './components/map/MapLayout';

function App() {
  useEffect(() => {
    const wakeUpBackend = async () =>
      await fetch(`${process.env.REACT_APP_HOST_URL}/wake-up`);
    wakeUpBackend();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Flex textAlign="center" height={'100vh'}>
        <MapLayout />
      </Flex>
    </ChakraProvider>
  );
}

export default App;
