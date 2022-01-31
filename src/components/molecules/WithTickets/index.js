import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useTickets } from "config/useTickets";

import { Spinner } from "components/atoms/spinner";

export const WithTickets = () => {
  const { fetch, loading, error } = useTickets();

  useEffect(() => {
    fetch();
  }, []);

  if (loading) {
    return <Spinner style={{ paddingTop: 72, height: "100vh" }} />;
  }

  if (error) {
    return "Oops something went wrong";
  }

  return <Outlet />;
};
