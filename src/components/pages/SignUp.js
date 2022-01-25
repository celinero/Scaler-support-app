import React, { useState } from "react";
import { useGlobalState } from "config/store";
import { signUpUser } from "services/userServices";
import { Form, Input, Field } from "components/atoms/form";
import { Container } from "components/atoms/layout";
import { Button, TextLink } from "components/atoms/button";
import { ErrorMessage } from "components/atoms/typo";

export const SignUp = (props) => {
  const [formValues, setFormValues] = useState({
    email: "",
    displayName: "",
    password: "",
  });
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

  function handleSubmit(event) {
    event.preventDefault();

    dispatch({ type: "user:fetch" });

    signUpUser(formValues)
      .then((response) => {
        dispatch({
          type: "user:login",
          data: {
            displayName: response.displayName,
            email: response.email,
            uid: response.uid,
            idToken: response.idToken,
            role: "user",
          },
        });
      })
      .catch(() => {
        dispatch({ type: "user:error" });
      });
  }

  return (
    <Container size="small">
      <Form style={{ marginTop: 50 }} onSubmit={handleSubmit}>
        <div>
          <h1>Welcome!</h1>
          <p style={{ marginTop: 5 }}>Let's create your account</p>
        </div>

        {user.error && <ErrorMessage>Oops something went wrong</ErrorMessage>}

        <Field label="Email">
          <Input
            onChange={handleChange}
            type="text"
            name="email"
            placeholder=" "
            value={formValues.email}
          />
        </Field>

        <Field label="Username">
          <Input
            onChange={handleChange}
            type="text"
            name="displayName"
            placeholder=" "
            value={formValues.displayName}
          />
        </Field>

        <Field label="Password">
          <Input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder=" "
            value={formValues.password}
          />
        </Field>

        <Button type="submit" fullWidth disabled={user.loading}>
          Sign Up
        </Button>
      </Form>

      <p style={{ marginTop: 50 }}>
        Already have an account? <TextLink to="/">Log in</TextLink>
      </p>
    </Container>
  );
};
