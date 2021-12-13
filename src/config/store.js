import { createContext, useContext } from 'react';

// context object
export const StateContext = createContext();

//hook that wraps useContext
export const useGlobalState = () => useContext(StateContext);
