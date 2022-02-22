import React, { useEffect, useCallback, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

import { useGlobalState } from "config/store";

import { validateUserSession, getUser } from "services/userServices";

import { Spinner } from "components/atoms/spinner";

import { Navbar } from "components/molecules/Navbar";

// WithAuthentication wraps all the routes
// it has access to the global store and also to the router
// so it can update the store and use the router to do redirections if needed
export const WithAuthentication = () => {
  const { dispatch } = useGlobalState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // on mount
  const syncUser = useCallback(async () => {
    // identify the location
    // > user pages are considered private, and so authentication is needed
    // if not the case, we need to redirect
    const isUserPage = /^\/user/.test(location.pathname);

    try {
      const idToken = sessionStorage.getItem("idToken");
      let response = null;

      // if there is an idToken in sessionStorage
      // validate it via firebase
      if (idToken) {
        response = await validateUserSession(idToken);
      }

      // if the token is valid,
      // then log in the user
      if (response?.fullDecodedToken) {
        const { uid, email } = response.fullDecodedToken;
        const { role, displayName } = await getUser(uid);

        dispatch({
          type: "user:login",
          data: {
            displayName,
            role,
            email,
            uid,
            idToken,
          },
        });
      }

      // no token, no response,
      // and we are on a page that require authentication
      // then redirect to entry point
      if ((!idToken || !response?.fullDecodedToken) && isUserPage) {
        sessionStorage.removeItem("idToken");
        navigate("/");
      }

      // if user is logged, and is on a "public" page
      // redirect the user to his dashboard
      if (idToken && !isUserPage) {
        navigate("/user/tickets");
      }
    } catch {
      // something went wrong, user is not logged
      // then redirect to entry point
      sessionStorage.removeItem("idToken");

      if (isUserPage) {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch, location.pathname, navigate]);

  useEffect(() => {
    syncUser();
  }, [syncUser]);

  if (loading) {
    return <Spinner style={{ height: "100vh" }} />;
  }

  return (
    <>
      <Navbar />
      {/* Outlet (https://reactrouter.com/docs/en/v6/getting-started/concepts#outlets)
       * refers to the children of the current route
       * so, ALL the routes of the application
       */}
      <Outlet />
    </>
  );
};
