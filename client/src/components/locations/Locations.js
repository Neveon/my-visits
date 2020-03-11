import React, { Fragment, useContext, useEffect } from 'react';
import LocationsItem from './LocationsItem';
import Spinner from '../layout/Spinner';
import LocationsContext from '../../context/locations/locationsContext';

const Locations = () => {
  const locationsContext = useContext(LocationsContext);
  const { loading, locations, getLocations } = locationsContext;

  useEffect(() => {
    getLocations();
    //eslint-disable-next-line
  }, [locations]);

  if(!locations){
    return <h4>Make sure to add a location to view them here!</h4>;
  }

  return (
    <Fragment>
      {locations !== null && !loading ? (
          <ul className='list-group'>
            {locations.map(loc => {
              return (
                  <LocationsItem key={loc.id} location={loc} />
              );
            })}
          </ul>
      ): (
        <div>
          
          <Spinner/>
        </div>
      )}
    </Fragment>
  );

};

export default Locations;