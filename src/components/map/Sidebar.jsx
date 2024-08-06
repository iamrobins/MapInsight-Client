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

const Sidebar = ({ place, setPlace }) => {
  const overlayLayoutRef = useRef(null);
  const sideBarBg = useColorModeValue('#FFFFFF', 'gray.800');
  const [text, setText] = useState();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    async function fetchPlaces() {
      if (!text) return;
      const response = await fetch(
        `${process.env.REACT_APP_HOST_URL}/v1/search/?text=${text}`
      );
      if (response.status !== 200) return;

      const data = await response.json();
      if (!data) return;
      setPlaces(data['data']);
    }
    fetchPlaces();
  }, [text]);

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
          <VStack spacing={4}>
            {places.length > 0 &&
              places.map(place => (
                <Card key={place.id} place={place} setPlace={setPlace} />
              ))}
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
