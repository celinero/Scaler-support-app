import { useCallback } from "react";
import { useGlobalState } from "config/store";
import { getTickets } from "services/ticketServices";

export const useTickets = () => {
  const {
    store: { tickets },
    dispatch,
  } = useGlobalState();

  const fetchTickets = useCallback(async () => {
    const response = await getTickets();
    dispatch({ type: "tickets:set", data: response });
  }, [dispatch]);

  return {
    tickets,
    fetchTickets,
  };
};
