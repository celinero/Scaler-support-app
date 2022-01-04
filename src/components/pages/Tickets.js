import React, { useEffect } from 'react';
import { useGlobalState } from 'config/store';
import { getTickets } from 'services/ticketServices';


import { CardDeck } from 'components/atoms';
import { PreviewTicket } from 'components/molecules/PreviewTicket'

export const Tickets = () => {
  const { store: { user, tickets }, dispatch } = useGlobalState();

  const fetchTickets = () => {
    dispatch({ type: 'tickets:fetch' })

    getTickets()
      .then((response) => {
        dispatch({ type: 'tickets:set' , data: response })
      }).catch((error) => {
        dispatch({ type: 'tickets:error' })
        console.log(error)
      })
  }

  useEffect(() => {
    if (user.data.isLoggedIn) {
      fetchTickets()
    }
  }, [user.data.isLoggedIn])

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
