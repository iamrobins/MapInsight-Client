import React, { useState, useEffect } from 'react';

import { AdvancedMarker, Map, Pin } from '@vis.gl/react-google-maps';

import { useColorModeValue } from '@chakra-ui/react';

const DEFAULT_CENTER = { lat: 52.50735, lng: -1.12776 };
const DEFAULT_ZOOM = 7;
const DEFAULT_ZOOM_WITH_LOCATION = 20;

const CustomMap = ({ place }) => {
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const mapTheme = useColorModeValue('8c732c82e4ec29d9', '7a9e2ebecd32a903');

  useEffect(() => {
    if (place) {
      setMapCenter(place);
      setZoom(DEFAULT_ZOOM_WITH_LOCATION);
    } else {
      setMapCenter(DEFAULT_CENTER);
      setZoom(DEFAULT_ZOOM);
    }
  }, [place]);

  return (
    <div className="SplitLayoutContainer" slot="main">
      <Map
        id="gmap"
        mapId={mapTheme}
        center={mapCenter}
        zoom={zoom}
        onCenterChanged={e => setMapCenter(e.detail.center)}
        onZoomChanged={e => setZoom(e.detail.zoom)}
        gestureHandling={'auto'}
        disableDefaultUI={false}
        fullscreenControl={false}
        zoomControl={false}
      >
        {place && (
          <AdvancedMarker position={place}>
            <Pin
              background={'#FBBC04'}
              glyphColor={'#000'}
              borderColor={'#000'}
            />
          </AdvancedMarker>
        )}
      </Map>
    </div>
  );
};

export default CustomMap;
