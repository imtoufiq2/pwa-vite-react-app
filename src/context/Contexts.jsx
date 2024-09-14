import PropTypes from "prop-types";
import { createContext, useContext, useReducer, useEffect } from "react";

import DataReducer from "./Reducers";

const context = createContext();
const initialState = {
  darkMode: false,
};

const Contexts = ({ children }) => {
  const localDarkMode = JSON.parse(localStorage.getItem("darkMode"));

  const [state, dispatch] = useReducer(DataReducer, {
    ...initialState,
    darkMode: localDarkMode !== null ? localDarkMode : initialState.darkMode,
  });
  console.log("hela");

  // Update localStorage whenever darkMode changes
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
  }, [state.darkMode]);

  // Add or remove the class for dark mode on the #root element
  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (state.darkMode) {
      rootElement.classList.add("dark_mode_background_color");
    } else {
      rootElement.classList.remove("dark_mode_background_color");
    }
  }, [state.darkMode]);

  // Dispatch action to toggle dark mode
  const toggleDarkMode = (isDarkMode) => {
    dispatch({ type: "SET_THE_MODE", payload: isDarkMode });
  };

  return (
    <context.Provider value={{ ...state, toggleDarkMode }}>
      {children}
    </context.Provider>
  );
};


// PropTypes validation
Contexts.propTypes = {
    children: PropTypes.node.isRequired,
  };
// Global Hook
const useGlobalHook = () => {
  return useContext(context);
};
export default Contexts;
export { useGlobalHook };