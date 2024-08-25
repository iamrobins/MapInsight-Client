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
  Box,
  SkeletonText,
  Skeleton,
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
  const [loading, setLoading] = useState(false);
  const debouncedText = useDebounce(text, 600); // Adjust delay as necessary (e.g., 500ms)

  useEffect(() => {
    async function fetchPlaces() {
      if (!text || text.length <= 4 || !debouncedText) return;
      setPlaces([]);
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_HOST_URL}/search/?text=${text}`
      );
      if (response.status !== 200) return;

      const data = await response.json();
      if (!data) return;
      setLoading(false);
      setPlaces(data['places'] || []);
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
                disabled={loading}
              />
            </InputGroup>
            <ColorModeSwitcher />
          </Flex>
          <VStack spacing={3} p={1}>
            {places.length === 0 && !loading ? (
              <></>
            ) : places.length === 0 && loading ? (
              <Box padding={'2'} w="100%" boxShadow="lg" bg={sideBarBg}>
                <Skeleton my="8" height="20px" />
                <Skeleton my="8" height="20px" />
                <Skeleton my="8" height="20px" />
                <Skeleton my="8" height="20px" />
                <Skeleton my="8" height="20px" />
                <Skeleton my="8" height="20px" />
                <Skeleton my="8" height="20px" />
                <Skeleton my="8" height="20px" />
                <Skeleton my="8" height="20px" />
                <Skeleton my="8" height="20px" />
                <Skeleton my="8" height="20px" />
                <Skeleton my="8" height="20px" />
              </Box>
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
