import { useCallback } from "react";
import { useGlobalState } from "config/store";
import { getCategories } from "services/categoriesServices";

export const useCategories = () => {
  const {
    store: { categories },
    dispatch,
  } = useGlobalState();

  const fetchCategories = useCallback(async () => {
    const response = await getCategories();
    dispatch({ type: "categories:set", data: response });
  }, [dispatch]);

  return {
    categories,
    fetchCategories,
  };
};
