import React from 'react';
import { useTickets } from 'config/useTickets';

import { CardDeck } from 'components/atoms';
import { PreviewTicket } from 'components/molecules/PreviewTicket'

export const Tickets = () => {
  const tickets = useTickets();

  if (tickets.error) {
    return <>oops something went wrong</>
  }

  if (tickets.loading || !tickets.completed) {
    return <>loading...</>
  }

  return(
    <CardDeck>
      {tickets
        .data.sort((a, b) => b.updated_at - a.updated_at)
        .map(ticket => (<PreviewTicket key={ticket._id} ticketId={ticket._id} />))
      }
    </CardDeck>
  )
}
