import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useGlobalState } from "config/store";
import { logInUser, getUser } from "services/userServices";
import { FieldText } from "components/atoms/form";
import { Container, Card } from "components/atoms/layout";
import { Button, TextLink } from "components/atoms/button";
import { ErrorMessage } from "components/atoms/typo";
import { parseError } from "config/api";
import { validateEmail, validatePassword } from "utils/validate";

export const LogIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const { dispatch } = useGlobalState();

  function handleChange(event) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { uid, displayName, email, idToken } = await logInUser(formValues);
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

      setLoading(false);
      navigate("/user/tickets");
    } catch (e) {
      setLoading(false);
      setError(parseError(e));
    }
  }

  return (
    <Container size="small">
      <form style={{ marginTop: 50 }} onSubmit={handleSubmit}>
        <Card>
          <div>
            <h1>Welcome back!</h1>
            <p style={{ marginTop: 5 }}>Let's log in</p>
          </div>

          {!!error && <ErrorMessage>{error}</ErrorMessage>}

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

          <Button
            type="submit"
            fullWidth
            disabled={loading}
            isLoading={loading}
          >
            Log In
          </Button>
        </Card>
      </form>

      <p style={{ marginTop: 50 }}>
        Don't have an account? <TextLink to="/signup">Sign up</TextLink>
      </p>
    </Container>
  );
};
