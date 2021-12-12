import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getTickets } from './services/ticketServices';
import { GlobalStyle } from './styled-components/globalStyles';
import Tickets from './components/Tickets';
import { Homepage } from './components/Homepage';


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
  
  return (
    <>
    <GlobalStyle />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/tickets" element={<Tickets loading={loading} tickets={tickets} />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
