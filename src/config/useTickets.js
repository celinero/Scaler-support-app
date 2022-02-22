import { useCallback } from "react";
import { useGlobalState } from "config/store";
import { getTickets } from "services/ticketServices";

// useTickets
// custom hook to quickly access
// > all the tickets from the global state
// > to refetch the tickets and update the global state
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
