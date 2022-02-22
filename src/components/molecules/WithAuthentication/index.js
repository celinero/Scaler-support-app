import React, { useEffect, useCallback, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

import { useGlobalState } from "config/store";

import { validateUserSession, getUser } from "services/userServices";

import { Spinner } from "components/atoms/spinner";

import { Navbar } from "components/molecules/Navbar";

export const WithAuthentication = () => {
  const { dispatch } = useGlobalState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const syncUser = useCallback(async () => {
    const isUserPage = /^\/user/.test(location.pathname);

    try {
      const idToken = sessionStorage.getItem("idToken");
      let response = null;

      if (idToken) {
        response = await validateUserSession(idToken);
      }

      if (response?.fullDecodedToken) {
        const { uid, name, email } = response.fullDecodedToken;
        const { role } = await getUser(uid);

        dispatch({
          type: "user:login",
          data: {
            displayName: name,
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
      <Outlet />
    </>
  );
};
