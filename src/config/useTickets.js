import { useEffect, useCallback } from "react";

import { useGlobalState } from "config/store";

import { getTickets } from "services/ticketServices";

export const useTickets = () => {
  const {
    store: { tickets },
    dispatch,
  } = useGlobalState();

  const fetchTickets = useCallback(() => {
    dispatch({ type: "tickets:fetch" });

    getTickets()
      .then((response) => {
        dispatch({ type: "tickets:set", data: response });
      })
      .catch(() => {
        dispatch({ type: "tickets:error" });
      });
  }, [dispatch]);

  const refetchTickets = useCallback(() => {
    getTickets()
      .then((response) => {
        dispatch({ type: "tickets:set", data: response });
      })
      .catch(() => {
        dispatch({ type: "tickets:error" });
      });
  }, [dispatch]);

  return {
    ...tickets,
    fetch: fetchTickets,
    refetch: refetchTickets,
  };
};
