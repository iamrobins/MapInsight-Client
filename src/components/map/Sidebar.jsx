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

import { Flex, useColorModeValue } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';

const Sidebar = ({ college, setCollege }) => {
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
          <Flex justifyContent={'center'} alignItems={'center'} px="2">
            <PlacePicker
              className="CollegePicker"
              ref={pickerRef}
              forMap="gmap"
              country={['us', 'ca', 'uk']}
              // type="university"
              placeholder="Enter a college in the US or Canada"
              onPlaceChange={() => {
                if (!pickerRef.current?.value) {
                  setCollege(undefined);
                } else {
                  setCollege(pickerRef.current?.value);
                }
              }}
            />
            <ColorModeSwitcher />
          </Flex>

          <PlaceOverview
            size="large"
            place={college}
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
          </PlaceOverview>
        </div>
        <div slot="overlay">
          <IconButton
            className="CloseButton"
            onClick={() => overlayLayoutRef.current?.hideOverlay()}
          >
            Close
          </IconButton>
          <PlaceDataProvider place={college}>
            <PlaceReviews />
          </PlaceDataProvider>
        </div>
      </OverlayLayout>
    </Flex>
  );
};

export default Sidebar;
