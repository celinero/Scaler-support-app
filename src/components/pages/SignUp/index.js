import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGlobalState } from "config/store";
import { signUpUser } from "services/userServices";
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

const usernameErrors = {
  required: "Username required",
};

export const SignUp = () => {
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onBlur",
  });

  const navigate = useNavigate();
  const { dispatch } = useGlobalState();

  async function onSubmit(formValues) {
    try {
      setError("");
      const response = await signUpUser(formValues);

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
            <h1>Welcome!</h1>
            <p style={{ marginTop: 5 }}>Let's create your account</p>
          </div>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <FieldText
            label="Email"
            {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })}
            error={emailErrors[errors?.email?.type]}
          />

          <FieldText
            label="Username"
            {...register("displayName", {
              required: true,
            })}
            error={usernameErrors[errors?.displayName?.type]}
          />

          <FieldText
            label="Password"
            type="password"
            {...register("password", {
              required: true,
              minLength: 8,
            })}
            error={passwordErrors[errors?.password?.type]}
          />

          <Button
            type="submit"
            fullWidth
            disabled={isSubmitting}
            isLoading={isSubmitting}
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
