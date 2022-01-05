import { useEffect, useCallback } from 'react'

import { useGlobalState } from 'config/store';

import { getTickets } from 'services/ticketServices';

export const useTickets = () => {
  const { store: { user, tickets }, dispatch } = useGlobalState();
  const shouldFetch = user.data.isLoggedIn && !tickets.loading && !tickets.initialise;

  const fetchTickets = useCallback(() => {
    dispatch({ type: 'tickets:fetch' })

    getTickets()
      .then((response) => {
        dispatch({ type: 'tickets:set' , data: response })
      }).catch((error) => {
        dispatch({ type: 'tickets:error' })
        console.log(error)
      })
  }, [dispatch])

  useEffect(() => {
    if (shouldFetch) {
      fetchTickets()
    }
  }, [shouldFetch, fetchTickets])

  return {
    ...tickets,
    refresh: fetchTickets
  }
}