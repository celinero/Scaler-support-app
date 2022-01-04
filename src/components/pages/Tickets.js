import React from 'react';
import { useTickets } from 'config/useTickets';

import { CardDeck } from 'components/atoms';
import { PreviewTicket } from 'components/molecules/PreviewTicket'

export const Tickets = () => {
  const tickets = useTickets();

  return(
    <CardDeck>
      {tickets.loading && !tickets.data.length && <>loading....</>}
      {tickets.error && <>sonething went wrong....</>}
      {tickets
        .data.sort((a, b) => b.updated_at - a.updated_at)
        .map(ticket => (<PreviewTicket key={ticket._id} ticketId={ticket._id} />))
      }
    </CardDeck>
  )
}
