import React, { useReducer, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./components/atoms/globalStyles";

import stateReducer from "./config/stateReducer";
import initialState from "./config/initialState";
import { StateContext } from "./config/store";

import { validateUserSession } from "services/userServices";
import { getCategories } from "services/categoriesServices";
import { getUser } from "services/userServices";

import { LogIn } from "components/pages/LogIn";
import { SignUp } from "components/pages/SignUp";
import { Tickets } from "components/pages/Tickets";
import { NewTicket } from "components/pages/NewTicket";
import { Ticket } from "components/pages/Ticket";

import { Navbar } from "components/molecules/Navbar";

const App = () => {
  const [store, dispatch] = useReducer(stateReducer, initialState);

  const syncUser = async () => {
    const idToken = sessionStorage.getItem("idToken");

    if (!idToken) return;

    const response = await validateUserSession(idToken);

    if (response.error) return;

    const { uid, name, email } = response.fullDecodedToken;
    const user = await getUser(uid);

    dispatch({
      type: "user:login",
      data: {
        displayName: name,
        role: user.role,
        email,
        uid,
        idToken,
      },
    });
  };

  const fetchCategories = () => {
    dispatch({ type: "categories:fetch" });

    getCategories()
      .then((response) => {
        dispatch({ type: "categories:set", data: response });
      })
      .catch((error) => {
        dispatch({ type: "categories:error" });
        console.log(error);
      });
  };

  useEffect(() => {
    syncUser();
    fetchCategories();
  }, []);

  return (
    <>
      <GlobalStyle />
      <StateContext.Provider value={{ store, dispatch }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/user/tickets" element={<Tickets />} />
            <Route path="/user/tickets/new" element={<NewTicket />} />
            <Route path="/user/tickets/:id" element={<Ticket />} />
          </Routes>
        </BrowserRouter>
      </StateContext.Provider>
    </>
  );
};

export default App;
