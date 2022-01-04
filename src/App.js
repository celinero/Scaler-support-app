import React, { useReducer, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './components/atoms/globalStyles';

import stateReducer from'./config/stateReducer';
import initialState from './config/initialState'
import { StateContext } from './config/store';

import { validateUserSession } from 'services/userServices';

import { Homepage } from 'components/pages/Homepage';
import { LogIn } from 'components/pages/LogIn';
import { SignUp } from 'components/pages/SignUp';
import { Tickets } from 'components/pages/Tickets';
import { NewTicket } from 'components/pages/NewTicket';
import { Ticket } from 'components/pages/Ticket';

import { Navbar } from 'components/molecules/Navbar';


const App = () => {
  const [store, dispatch] = useReducer(stateReducer, initialState);

  useEffect(() => {
    const idToken = sessionStorage.getItem('idToken');

    if (!idToken) return;

    dispatch({ type: "user:fetch" })

    validateUserSession(idToken)
      .then((response) => {
        dispatch({ type: "user:login", data: {
          email: response.fullDecodedToken.email,
          uid: response.fullDecodedToken.uid,
          idToken
        }})
      })
      .catch(() => {
        dispatch({ type: "user:error" })
      })
  }, [])

  return (
    <>
      <GlobalStyle />
      <StateContext.Provider value={{ store, dispatch }}>

        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/user/tickets" element={<Tickets />} />
            <Route path="/user/tickets/new" element={<NewTicket />} />
            <Route path="/user/tickets/:id" element={<Ticket />} />
          </Routes>
        </BrowserRouter>
      </StateContext.Provider>
    </>
  )
}

export default App
