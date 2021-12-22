import React, { useReducer, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getTickets } from './services/ticketServices';
import { GlobalStyle } from './styled-components/globalStyles';
import Tickets from './components/Tickets';
import { Ticket } from './components/Ticket';
import { NewTicket } from './components/NewTicket';
import { NavBar } from './components/Navbar';
import stateReducer from'./config/stateReducer';
import initialState from './config/initialState'
import { StateContext } from './config/store';
import { getCategories } from './services/categoriesServices';
import { LogIn } from './components/LogIn';
// import { Homepage } from './components/Homepage';


const App = () => {
  const [store, dispatch] = useReducer(stateReducer, initialState);
  const { tickets, categories } = store;

  useEffect(() => {
    getCategories()
      .then(categories => dispatch({type: "setCategories", data: categories}))
      .catch(error => console.log(error))

    getTickets()
      .then(tickets => dispatch({type: "setTickets", data: tickets}))
      .catch(error => console.log(error))
  }, [])

  if (!tickets.length || !categories.length) {
    // TODO:
    // display loading state
    return <p>loading...</p>;
  }
  
  return (
    <>
      <GlobalStyle />
      <StateContext.Provider value={{store, dispatch}}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Navigate to="/tickets" />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/tickets/new" element={<NewTicket />} />
            <Route path="/tickets/:id" element={<Ticket />} />
            <Route path="/auth/login" element={<LogIn />} />
          </Routes>
        </BrowserRouter>
      </StateContext.Provider>
    </>
  )
}

export default App
