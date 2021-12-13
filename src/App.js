import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { createNewTicket, getTickets } from './services/ticketServices';
import { GlobalStyle } from './styled-components/globalStyles';
import Tickets from './components/Tickets';
import { Ticket } from './components/Ticket';
import { NewTicket } from './components/NewTicket';
// import { Homepage } from './components/Homepage';


const App = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    getTickets() 
      .then(tickets => {
        console.log(tickets)
        setTickets(tickets)}
        )
      .catch(error => console.log(error))
      .finally(()=> setLoading(false))
  }, [])

  function addNewTicket(ticketObject) {
    setLoading(true)
    createNewTicket(ticketObject)
      .then(newTicket => setTickets([...tickets, newTicket]))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }
  
  return (
    <>
    <GlobalStyle />
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Homepage/>} /> */}
        <Route path="/tickets" element={<Tickets loading={loading} tickets={tickets} />} />
        <Route path="/tickets/new" element={<NewTicket addNewTicket={addNewTicket} />} />
        <Route path="/tickets/:id" element={<Ticket />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
