import React, { useReducer } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GlobalStyle } from "./components/atoms/globalStyles";

import stateReducer from "./config/stateReducer";
import initialState from "./config/initialState";
import { StateContext } from "./config/store";

import { LogIn } from "components/pages/Login";
import { SignUp } from "components/pages/SignUp";
import { Tickets } from "components/pages/Tickets";
import { NewTicket } from "components/pages/NewTicket";
import { Ticket } from "components/pages/Ticket";

import { WithTickets } from "components/molecules/WithTickets";
import { WithAuthentication } from "components/molecules/WithAuthentication";

const App = () => {
  const [store, dispatch] = useReducer(stateReducer, initialState);

  return (
    <>
      <GlobalStyle />
      <StateContext.Provider value={{ store, dispatch }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WithAuthentication />}>
              <Route exact path="/" element={<LogIn />} />
              <Route path="signup" element={<SignUp />} />

              <Route path="user" element={<WithTickets />}>
                <Route path="tickets" element={<Tickets />} />
                <Route path="tickets/new" element={<NewTicket />} />
                <Route path="tickets/:id" element={<Ticket />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </StateContext.Provider>
    </>
  );
};

export default App;
