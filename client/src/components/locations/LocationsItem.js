import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import LocationsContext from '../../context/locations/locationsContext';

const LocationsItem = ({ location }) => {
  const locationsContext = useContext(LocationsContext);
  const { deleteLocation } = locationsContext;

  const { id, address} = location;

  const onDelete = () => {
    deleteLocation(id);
  }

  return (
    <li className='list-group-item'>
      {address}
      <span style={{ float: 'right' }}>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </span>
    </li>
  );

};

LocationsItem.propTypes = {
  location: PropTypes.object.isRequired
};

export default LocationsItem;