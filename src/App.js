import React, { useReducer, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { createNewTicket, getTickets } from './services/ticketServices';
import { GlobalStyle } from './styled-components/globalStyles';
import Tickets from './components/Tickets';
import { Ticket } from './components/Ticket';
import { NewTicket } from './components/NewTicket';
import { NavBar } from './components/NavBar';
import stateReducer from'./config/stateReducer';
import initialState from './config/initialState'
import { StateContext } from './config/store';
// import { Homepage } from './components/Homepage';


const App = () => {
  const [store, dispatch] = useReducer(stateReducer, initialState)
  // const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTickets()
      .then(tickets => dispatch({type: "setTickets", data: tickets}))
      .catch(error => console.log(error))
      // .finally(() => setLoading(false))
  }, [])
  
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
          </Routes>
        </BrowserRouter>
      </StateContext.Provider>
    </>
  )
}

export default App
