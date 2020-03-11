import React, { useReducer } from 'react';
import axios from 'axios';
import LocationsContext from './locationsContext';
import locationReducer from './locationsReducer';
import {
  GET_LOCATIONS,
  ADD_LOCATION,
  DELETE_LOCATIONS,
  LOCATIONS_ERROR,
  CLEAR_LOCATIONS_ERROR
} from '../types';

const LocationsState = props => {
  const initialState = {
    locations: null,
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(locationReducer, initialState);

  // Get Locations
  const getLocations = async() => {
    try {
      const res = await axios.get('/locations');
      dispatch({
        type: GET_LOCATIONS,
        payload: res.data.data
      });
    } catch(err) {
      dispatch({
        type: LOCATIONS_ERROR,
        payload: 'error obtaining location'
      });
    }
  };

  // Add Location
  const addLocation = async location => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/locations', location, config);
      dispatch({
        type: ADD_LOCATION,
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: LOCATIONS_ERROR,
        payload: 'Cannot add location'
      });
    }
  };

  // Delete Location
  const deleteLocation = async id => {
    try {
      await axios.delete(`/locations/${id}`);

      dispatch({
        type: DELETE_LOCATIONS,
        payload: id
      });
    } catch(err) {
      dispatch({
        type: LOCATIONS_ERROR,
        payload: err.response.msg
      });
    }
  }

  // Clear Errors
  const clearErrors = () => {
    dispatch({ type: CLEAR_LOCATIONS_ERROR });
  };

  return (
    <LocationsContext.Provider
      value={{
        locations: state.locations,
        error: state.error,
        addLocation,
        getLocations,
        deleteLocation,
        clearErrors
      }}
    >
      {props.children}
    </LocationsContext.Provider>
  );

};

export default LocationsState;