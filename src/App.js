import React, {useState, useEffect} from 'react'
import {getTickets} from './services/ticketServices'

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
    <div >
      {
        loading
        ?
        (<p>Loading</p>)
        :
        (<p>Got tickets</p>)
      }
    </div>
  )
}

export default App
