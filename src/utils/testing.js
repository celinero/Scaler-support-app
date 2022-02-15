import { render } from "@testing-library/react";
import { Router, Routes, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import { StateContext } from "config/store";

export const customRender = (Ui, { location, path, store, dispatch } = {}) => {
  const history = createMemoryHistory();

  render(
    <StateContext.Provider
      value={{
        store,
        dispatch,
      }}
    >
      <Router location={location || "/"} navigator={history}>
        <Routes>
          <Route path={path || "/"} element={Ui} />
        </Routes>
      </Router>
    </StateContext.Provider>
  );

  return {
    history,
  };
};
