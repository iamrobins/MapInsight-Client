import React, { useState, useRef, useEffect } from 'react';
import {
  IconButton,
  OverlayLayout,
} from '@googlemaps/extended-component-library/react';

import {
  Flex,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Input,
  VStack,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import Card from './Card';

// Debounce function
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const Sidebar = ({ place, setPlace }) => {
  const overlayLayoutRef = useRef(null);
  const sideBarBg = useColorModeValue('#FFFFFF', 'gray.800');
  const [text, setText] = useState();
  const [places, setPlaces] = useState([]);
  const debouncedText = useDebounce(text, 600); // Adjust delay as necessary (e.g., 500ms)

  const fetchPlacesWithSummaries = async jobId => {
    const response = await fetch(
      `${process.env.REACT_APP_HOST_URL}/v1/summaries/?jobId=${jobId}`
    );
    if (response.status !== 200) return;

    const data = await response.json();
    if (!data) return;
    setPlaces(data || []);
  };

  useEffect(() => {
    async function fetchPlaces() {
      if (!text || text.length <= 4 || !debouncedText) return;

      const response = await fetch(
        `${process.env.REACT_APP_HOST_URL}/v1/search/?text=${text}`
      );
      if (response.status !== 200) return;

      const data = await response.json();
      if (!data) return;
      setPlaces(data['data'] || []);
      console.log(data);

      if (!data['jobId']) return;

      const ws = new WebSocket(process.env.REACT_APP_WS_HOST_URL);

      ws.onopen = () => {
        console.log('Connected to WebSocket server');
        ws.send(JSON.stringify({ jobId: data['jobId'] }));
      };

      ws.onmessage = async event => {
        console.log(event.data);

        // Check if the job status is "done" and close the connection
        if (event.data.includes('complete')) {
          await fetchPlacesWithSummaries(data['jobId']);
          ws.close();
        }
      };

      ws.onclose = () => {
        console.log('Disconnected from WebSocket server');
      };

      ws.onerror = error => {
        console.error('WebSocket error:', error);
      };
    }
    fetchPlaces();
  }, [debouncedText]);

  return (
    <Flex
      className="SplitLayoutContainer"
      slot="fixed"
      flexDir={'column'}
      bg={sideBarBg}
    >
      <OverlayLayout ref={overlayLayoutRef}>
        <div className="MainContainer" slot="main">
          <Flex my={3} w="90%" mx="auto">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search for places"
                onChange={e => setText(e.target.value)}
              />
            </InputGroup>
            <ColorModeSwitcher />
          </Flex>
          <VStack spacing={3} p={1}>
            {places.length === 0 ? (
              <></>
            ) : (
              places.map(place => (
                <Card key={place.id} place={place} setPlace={setPlace} />
              ))
            )}
          </VStack>
        </div>
        <div slot="overlay">
          <IconButton
            className="CloseButton"
            onClick={() => overlayLayoutRef.current?.hideOverlay()}
          >
            Close
          </IconButton>
        </div>
      </OverlayLayout>
    </Flex>
  );
};

export default Sidebar;
