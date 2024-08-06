import React, { useRef } from 'react';
import {
  PlaceReviews,
  PlaceDataProvider,
  PlaceDirectionsButton,
  IconButton,
  PlaceOverview,
  OverlayLayout,
  PlacePicker,
} from '@googlemaps/extended-component-library/react';

import {
  Flex,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Input,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import Card from './Card';

const Sidebar = ({ place, setPlace }) => {
  const overlayLayoutRef = useRef(null);
  const pickerRef = useRef(null);
  const sideBarBg = useColorModeValue('#FFFFFF', 'gray.800');

  return (
    <Flex
      className="SplitLayoutContainer"
      slot="fixed"
      flexDir={'column'}
      bg={sideBarBg}
    >
      <OverlayLayout ref={overlayLayoutRef}>
        <div className="MainContainer" slot="main">
          {/* <Flex justifyContent={'center'} alignItems={'center'} px="2">
            <PlacePicker
              className="PlacePicker"
              ref={pickerRef}
              forMap="gmap"
              country={['us', 'ca', 'uk']}
              // type="university"
              placeholder="Enter a place in the US, Canada or UK"
              onPlaceChange={() => {
                if (!pickerRef.current?.value) {
                  setPlace(undefined);
                } else {
                  setPlace(pickerRef.current?.value);
                }
              }}
            />
            <ColorModeSwitcher />
          </Flex> */}

          {/* <PlaceOverview
            size="large"
            place={place}
            googleLogoAlreadyDisplayed
          >
            <div slot="action">
              <IconButton
                slot="action"
                variant="filled"
                onClick={() => overlayLayoutRef.current?.showOverlay()}
              >
                See Reviews
              </IconButton>
            </div>
            <div slot="action">
              <PlaceDirectionsButton slot="action" variant="filled">
                Directions
              </PlaceDirectionsButton>
            </div>
          </PlaceOverview> */}
          <Flex my={3} w="90%" mx="auto">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input type="text" placeholder="Search for places" />
            </InputGroup>
            <ColorModeSwitcher />
          </Flex>
          <Card />
        </div>
        <div slot="overlay">
          <IconButton
            className="CloseButton"
            onClick={() => overlayLayoutRef.current?.hideOverlay()}
          >
            Close
          </IconButton>
          <PlaceDataProvider place={place}>
            <PlaceReviews />
          </PlaceDataProvider>
        </div>
      </OverlayLayout>
    </Flex>
  );
};

export default Sidebar;
