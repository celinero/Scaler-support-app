import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { useTickets } from "config/useTickets";
import { useCategories } from "config/useCategories";

import { Spinner } from "components/atoms/spinner";

// WithTickets
// fetch tickets and categories for a specific user
// and render the Outlet ONCE the data are available
export const WithTickets = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { fetchTickets } = useTickets();
  const { fetchCategories } = useCategories();

  useEffect(() => {
    (async () => {
      try {
        await fetchCategories();
        await fetchTickets();
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [fetchCategories, fetchTickets]);

  if (loading) {
    return <Spinner style={{ height: "calc(100vh - 72px)" }} />;
  }

  if (error) {
    return "Oops something went wrong";
  }

  // Outlet refer the the private routes /user/*
  return <Outlet />;
};
