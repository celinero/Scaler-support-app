import React, { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import { useGlobalState } from "config/store";

import { validateUserSession, getUser } from "services/userServices";

import { Spinner } from "components/atoms/spinner";

import { Navbar } from "components/molecules/Navbar";

export const WithAuthentication = () => {
  const { dispatch } = useGlobalState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const syncUser = async () => {
    const idToken = sessionStorage.getItem("idToken");

    if (!idToken) {
      navigate("/");
      setLoading(false);
      return;
    }

    const response = await validateUserSession(idToken);

    if (response.error) {
      navigate("/");
      setLoading(false);
      return;
    }

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

    setLoading(false);
  };

  useEffect(() => {
    syncUser();
  }, []);

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
