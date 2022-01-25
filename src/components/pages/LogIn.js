import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useGlobalState } from "config/store";
import { logInUser, getUser } from "services/userServices";
import { Form, FieldText } from "components/atoms/form";
import { Container } from "components/atoms/layout";
import { Button, TextLink } from "components/atoms/button";
import { ErrorMessage } from "components/atoms/typo";

export const LogIn = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const {
    store: { user },
    dispatch,
  } = useGlobalState();

  function handleChange(event) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    dispatch({ type: "user:fetch" });

    try {
      const response = await logInUser(formValues);
      const { uid, displayName, email, idToken } = response;
      const user = await getUser(uid);

      dispatch({
        type: "user:login",
        data: {
          role: user.role,
          displayName,
          email,
          uid,
          idToken,
        },
      });
      navigate("/user/tickets");
    } catch {
      dispatch({ type: "user:error" });
    }
  }

  return (
    <Container size="small">
      <Form style={{ marginTop: 50 }} onSubmit={handleSubmit}>
        <div>
          <h1>Welcome back!</h1>
          <p style={{ marginTop: 5 }}>Let's log in</p>
        </div>

        {user.error && <ErrorMessage>Oops something went wrong</ErrorMessage>}

        <FieldText
          label="Email"
          name="email"
          onChange={handleChange}
          value={formValues.email}
        />

        <FieldText
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
          value={formValues.password}
        />

        <Button type="submit" fullWidth disabled={user.loading}>
          Log In
        </Button>
      </Form>

      <p style={{ marginTop: 50 }}>
        Don't have an account? <TextLink to="/signup">Sign up</TextLink>
      </p>
    </Container>
  );
};
