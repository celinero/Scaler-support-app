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

// App is the top level component
// it renders all providers: StateContext, BrowserRouter
// any component INSIDE <App /> can access the global state and the router
const App = () => {
  // global state
  const [store, dispatch] = useReducer(stateReducer, initialState);

  return (
    <>
      <GlobalStyle />
      <StateContext.Provider value={{ store, dispatch }}>
        <BrowserRouter>
          <Routes>
            {/* WithAuthentication (hoc)
             * wraps ALL the routes
             * check if user is logged in or not on mount
             * and redirect if needed
             *
             * prefer to do the redirection from a component
             * that is INSIDE the BrowserRouter instead of <App />
             * so we can use the BrowserRouter context
             */}
            <Route path="/" element={<WithAuthentication />}>
              <Route exact path="/" element={<LogIn />} />
              <Route path="signup" element={<SignUp />} />

              {/* WithTickets (hoc)
               * fetch tickets and categories for logged in user
               * /user/* are considered private routes
               */}
              <Route path="user" element={<WithTickets />}>
                <Route path="tickets" element={<Tickets />} />
                <Route path="tickets/new" element={<NewTicket />} />
                <Route path="tickets/:id" element={<Ticket />} />
              </Route>
            </Route>

            {/* if no routes match the location,
             * redirect to "/" login
             */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </StateContext.Provider>
    </>
  );
};

export default App;
