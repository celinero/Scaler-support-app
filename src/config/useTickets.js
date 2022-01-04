import { useEffect } from 'react'

import { useGlobalState } from 'config/store';

import { getTickets } from 'services/ticketServices';

export const useTickets = () => {
  const { store: { user, tickets, categories }, dispatch } = useGlobalState();

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
    if (user.data.isLoggedIn && !tickets.loading && !tickets.initialise) {
      fetchTickets()
    }
  }, [user.data.isLoggedIn])

  return {
    ...tickets,
    refresh: fetchTickets
  }
}