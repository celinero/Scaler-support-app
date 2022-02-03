import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "config/store";
import { signUpUser } from "services/userServices";
import { FieldText } from "components/atoms/form";
import { Container, Card } from "components/atoms/layout";
import { Button, TextLink } from "components/atoms/button";
import { ErrorMessage } from "components/atoms/typo";

export const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    displayName: "",
    password: "",
  });
  const navigate = useNavigate();
  const { dispatch } = useGlobalState();

  function handleChange(event) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError(false);

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
        setLoading(false);
        navigate("/user/tickets");
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }

  return (
    <Container size="small">
      <form style={{ marginTop: 50 }} onSubmit={handleSubmit}>
        <Card>
          <div>
            <h1>Welcome!</h1>
            <p style={{ marginTop: 5 }}>Let's create your account</p>
          </div>

          {error && <ErrorMessage>Oops something went wrong</ErrorMessage>}

          <FieldText
            label="Email"
            name="email"
            onChange={handleChange}
            value={formValues.email}
          />

          <FieldText
            label="Username"
            name="displayName"
            onChange={handleChange}
            value={formValues.displayName}
          />

          <FieldText
            label="Password"
            type="password"
            name="password"
            onChange={handleChange}
            value={formValues.password}
          />

          <Button
            type="submit"
            fullWidth
            disabled={loading}
            isLoading={loading}
          >
            Sign Up
          </Button>
        </Card>
      </form>

      <p style={{ marginTop: 50 }}>
        Already have an account? <TextLink to="/">Log in</TextLink>
      </p>
    </Container>
  );
};
