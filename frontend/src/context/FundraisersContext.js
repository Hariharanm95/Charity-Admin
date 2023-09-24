// FundraisersContext.js
import { createContext, useReducer } from 'react';

// Create the Fundraisers context
export const FundraisersContext = createContext();

// Define the initial state for fundraisers

// Create a reducer function for the fundraisers context
export const fundraisersReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FUNDRAISERS':
      return {
        ...state,
        fundraisers: action.payload,
      };
    case "DELETE_FUNDRAISER":
      return {
          ...state,
          fundraisers: state.fundraisers.filter(
              (fundraiser) => fundraiser._id !== action.payload            ),
        };
    // Add more cases for other actions if needed
    default:
      return state;
  }
};

// Create the FundraisersContextProvider component
export const FundraisersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(fundraisersReducer, {
    fundraisers: null
  });

  return (
    <FundraisersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FundraisersContext.Provider>
  );
};

