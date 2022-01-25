import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useGlobalState } from "config/store";
import { logInUser, getUser } from "services/userServices";
import {
  OuterContainerCenter,
  Form,
  Title,
  Subtitle,
  InputContainer,
  Input,
  Cut,
  Placeholder,
  Submit,
  Field,
} from "components/atoms/form";
import { Container } from "components/atoms/layout";
import { Button } from "components/atoms/button";
import { ErrorMessage } from "components/atoms/typo";

export const LogIn = (props) => {
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

      if (response.error) {
        dispatch({ type: "user:error" });
        return;
      }

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

        <Field label="Email">
          <Input
            onChange={handleChange}
            type="text"
            name="email"
            placeholder=" "
            value={formValues.email}
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
          Log In
        </Button>
      </Form>
    </Container>
  );
};
