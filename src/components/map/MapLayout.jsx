import './map.css';
import React, { useState } from 'react';

import { APIProvider } from '@vis.gl/react-google-maps';
import { SplitLayout } from '@googlemaps/extended-component-library/react';

import Sidebar from './Sidebar';
import CustomMap from './CustomMap';

const API_KEY = process.env.REACT_APP_MAP_INSIGHT_GCP_KEY;

const MapLayout = () => {
  const [place, setPlace] = useState(undefined);
  return (
    <div className="App">
      <APIProvider
        solutionChannel="GMP_visgl_rgmlibrary_v1_extendedcomponentlibraryexample"
        apiKey={API_KEY}
        version="beta"
      >
        <SplitLayout rowLayoutMinWidth={700}>
          <Sidebar place={place} setPlace={setPlace} />
          <CustomMap place={place} />
        </SplitLayout>
      </APIProvider>
    </div>
  );
};

export default MapLayout;
