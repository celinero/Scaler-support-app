import React, { useReducer, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getTickets } from './services/ticketServices';
import { GlobalStyle } from './styled-components/globalStyles';
import Tickets from './components/Tickets';
import { Homepage } from './components/Homepage';
import { Ticket } from './components/Ticket';
import { NewTicket } from './components/NewTicket';
import { NavBar } from './components/Navbar';
import stateReducer from'./config/stateReducer';
import initialState from './config/initialState'
import { StateContext } from './config/store';
import { getCategories } from './services/categoriesServices';
import { validateUserSession } from './services/userServices'
import { LogIn } from './components/LogIn';
import { SignUp } from './components/SignUp';


const App = () => {
  const [store, dispatch] = useReducer(stateReducer, initialState);
  const { tickets, categories } = store;

  useEffect(() => {
    validateUserSession()
      .then(data => {
        if (data) dispatch({ type: 'setLoggedInUser', data: data.email });
      })
      .catch(error => console.log(error))

    getCategories()
      .then(categories => dispatch({type: "setCategories", data: categories}))
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    if (!store.loggedInUser) return <LogIn />;

    getTickets()
      .then(tickets => dispatch({type: "setTickets", data: tickets}))
      .catch(error => console.log(error))
  }, [store.loggedInUser])

  // if (!tickets || !categories) {
  //   // TODO:
  //   // display loading state
  //   // return <p>loading...</p>;
  //   return <Homepage />;
  // }
  
  return (
    <>
      <GlobalStyle />
      <StateContext.Provider value={{store, dispatch}}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/tickets/new" element={<NewTicket />} />
            <Route path="/tickets/:id" element={<Ticket />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route exact path="/" element={<Homepage />} />
          </Routes>
        </BrowserRouter>
      </StateContext.Provider>
    </>
  )
}

export default App
