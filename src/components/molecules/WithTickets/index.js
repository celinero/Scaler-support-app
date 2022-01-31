import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useGlobalState } from "config/store";

import { useTickets } from "config/useTickets";

import { getCategories } from "services/categoriesServices";

import { Spinner } from "components/atoms/spinner";

export const WithTickets = () => {
  const { dispatch } = useGlobalState();

  const tickets = useTickets();

  const fetchCategories = async () => {
    const response = await getCategories();
    dispatch({ type: "categories:set", data: response });
  };

  useEffect(() => {
    (async () => {
      await fetchCategories();
      await tickets.fetch();
    })();
  }, []);

  if (tickets.loading) {
    return <Spinner style={{ height: "calc(100vh - 72px)" }} />;
  }

  if (tickets.error) {
    return "Oops something went wrong";
  }

  return <Outlet />;
};
