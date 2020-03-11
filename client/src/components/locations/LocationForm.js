import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import LocationsContext from '../../context/locations/locationsContext';

const LocationsForm = () => {
  const locationsContext = useContext(LocationsContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;
  const { addLocation, error, clearErrors } = locationsContext;

  useEffect(() => {
    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
    
    // eslint-disable-next-line
  }, [error]);

  const [location, setLocation] = useState({
    address: ''
  });

  const { address } = location;

  const onChange = e =>
    setLocation({ ...location, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if(address === ''){
      setAlert('Please enter all fields', 'danger');
    } else {
      addLocation(location);

      setLocation({
        address: ''
      });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        Add an address
      </h2>
      <input
        type='text'
        placeholder='1234 example address rd Town, State'
        name='address'
        value={address}
        onChange={onChange}
      />
      <div>
        <input
          type='submit'
          value='Add Location'
          className='btn btn-primary btn-block'
        />
      </div>
    </form>
  );
};

export default LocationsForm;