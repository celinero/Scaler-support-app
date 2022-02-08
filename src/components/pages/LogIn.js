import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useGlobalState } from "config/store";
import { logInUser, getUser } from "services/userServices";
import { FieldText } from "components/atoms/form";
import { Container, Card } from "components/atoms/layout";
import { Button, TextLink } from "components/atoms/button";
import { ErrorMessage } from "components/atoms/typo";
import { parseError } from "config/api";

const emailErrors = {
  required: "Email required",
  pattern: "Email invalid",
};

const passwordErrors = {
  required: "Password required",
  minLength: "Password invalid",
};

export const LogIn = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useGlobalState();

  const { register, handleSubmit, formState } = useForm({
    mode: "onBlur",
  });

  async function onSubmit(formValues) {
    try {
      setError("");
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

      navigate("/user/tickets");
    } catch (e) {
      setError(parseError(e));
    }
  }

  return (
    <Container size="small">
      <form style={{ marginTop: 50 }} onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <div>
            <h1>Welcome back!</h1>
            <p style={{ marginTop: 5 }}>Let's log in</p>
          </div>

          {!!error && <ErrorMessage>{error}</ErrorMessage>}

          <FieldText
            label="Email"
            {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })}
            error={emailErrors[formState.errors?.email?.type]}
          />

          <FieldText
            label="Password"
            type="password"
            {...register("password", {
              required: true,
              minLength: 8,
            })}
            error={passwordErrors[formState.errors?.password?.type]}
          />

          <Button
            type="submit"
            fullWidth
            disabled={formState.isSubmitting}
            isLoading={formState.isSubmitting}
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
