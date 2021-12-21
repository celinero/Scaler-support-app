import React from 'react';
import { useGlobalState } from '../config/store';
// import { getTickets } from '../services/ticketServices';
import { CardDeck } from '../styled-components';
import { Dashboard } from './Dashboard'

const Tickets = (props) => {
  const loading = false;
  const {store} = useGlobalState();
  const {tickets} = store;

  console.log(tickets)

  return(
    <>
      {loading ?
      (<p>Loading</p>) 
      : 
      (<CardDeck>
        {tickets
          .sort((a, b) => b.updated_at - a.updated_at)
          .map(ticket => (<Dashboard key={ticket._id} ticket={ticket} />))
        }
      </CardDeck>)
      }
    </>
  )
}

export default Tickets;