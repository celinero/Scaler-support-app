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

    if ((!idToken || !response?.fullDecodedToken) && isUserPage) {
      navigate("/");
    }

    if (idToken && !isUserPage) {
      navigate("/user/tickets");
    }

    setLoading(false);
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
