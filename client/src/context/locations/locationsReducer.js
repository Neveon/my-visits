import {
  GET_LOCATIONS,
  ADD_LOCATION,
  DELETE_LOCATIONS,
  LOCATIONS_ERROR,
  CLEAR_LOCATIONS_ERROR
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
        loading: false
      };
    case ADD_LOCATION:
      // IF ELSE TO RETURN LOCATIONS: [ACTION.PAYLOAD] OR IF LOCATIONS !== UNDEFINED THEN SPREAD IT
      if(state.locations){
        return {
          ...state,
          locations: [action.payload, ...state.locations]
        };
      } else {
        return {
          ...state,
          locations: [action.payload]
        }
      }
      
    case DELETE_LOCATIONS:
      return {
        ...state,
        locations: state.locations.map(loc => {
          return loc.id === action.payload.id ? action.payload : loc
        }),
        loading: false
      };
    case LOCATIONS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_LOCATIONS_ERROR:
      return {
        ...state,
        error: null,
        loading: false
      }
    default:
      return state;
  }
};