import React from 'react';
import Locations from '../locations/Locations';
import LocationsForm from '../locations/LocationForm';
import Mapbox from '../locations/Mapbox';

const Home = () => {

  return (
    <div className='grid-2'>
      <div>
        <Mapbox/>
      </div>
      <div>
        <Locations/>
        <LocationsForm/>
      </div>
    </div>
  )

};

export default Home;