import React, { useContext } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import LocationsContext from '../../context/locations/locationsContext';
import Spinner from '../layout/Spinner';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoibmV2ZW9uIiwiYSI6ImNrN2NhaXd3czAyNWMzb253eWpweXBzbGkifQ.ejy9zMCAAvoL6pNKAhYX9w'
});

const Mapbox = () => {

  const locationsContext = useContext(LocationsContext);
  const { locations } = locationsContext;

  if(locations){
    return(
      <Map
      container='map'
      style='mapbox://styles/mapbox/streets-v11'
      containerStyle={{
        width:'75vw',
        height: '50vh'
      }}
      zoom={[2]}
    >
          <Layer
            type='symbol'
            id='points'
            layout={{
              'icon-image': 'marker-15',
              'icon-size': 2,
              'text-field': '{locationAddress}',
              'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
              'text-offset': [0, 0.9],
              'text-anchor': 'top'
            }}
          >
            {locations.map(loc => {
              return (
                <Feature
                  key={loc.id}
                  coordinates={[loc.lng, loc.lat]}
                  properties={{locationAddress: loc.address}}
                />
              )
            })}
          </Layer>
    </Map>
    );
  } else {
    return <Spinner/>;
  }
}


export default Mapbox;