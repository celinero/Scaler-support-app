import React from 'react';
import { CardContainer } from '../styled-components';
import { Dashboard } from './Dashboard'

const Tickets = (props) => {
const {loading, tickets} = props;

  return(
    <>
      {loading ?
      (<p>Loading</p>) 
      : 
      (<CardContainer>
        {tickets.sort((a, b) => b.updated_at - a.updated_at).map(ticket => (<Dashboard key={ticket.id} ticket={ticket} />))}
      </CardContainer>)
      }
    </>
  )
}

export default Tickets;