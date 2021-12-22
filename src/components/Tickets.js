import React from 'react';
import { useGlobalState } from '../config/store';
import { CardDeck } from '../styled-components';
import { Dashboard } from './Dashboard'

const Tickets = () => {
  const { store } = useGlobalState();
  const { tickets } = store;

  return(
    <CardDeck>
      {tickets
        .sort((a, b) => b.updated_at - a.updated_at)
        .map(ticket => (<Dashboard key={ticket._id} ticketId={ticket._id} />))
      }
    </CardDeck>
  )
}

export default Tickets;