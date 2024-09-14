// import { createContext, useContext, useReducer, useEffect } from "react";

// Reducer function to handle actions
const DataReducer = (state, action) => {
  switch (action.type) {
    case "SET_THE_MODE":
      return {
        ...state,
        darkMode: action.payload,
      };

    default:
      return state;
  }
};

export default DataReducer;
