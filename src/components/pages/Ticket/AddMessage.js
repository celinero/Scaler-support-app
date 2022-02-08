import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTickets } from "config/useTickets";
import { Container, Card } from "components/atoms/layout";
import { FieldTextArea } from "components/atoms/form";
import { Button } from "components/atoms/button";
import { ErrorMessage } from "components/atoms/typo";
import { addMessageToTicket, updateTicket } from "services/ticketServices";
import { useGlobalState } from "config/store";

const messageErrors = {
  required: "Message required",
};

export const AddMessage = () => {
  const { id } = useParams();
  const {
    store: { user },
  } = useGlobalState();
  const { fetchTickets } = useTickets();

  const [error, setError] = useState(false);

  const {
    reset,
    register,

    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  async function onSubmit(formValues) {
    try {
      setError(false);
      await addMessageToTicket(id, {
        ...formValues,
        ticketUserID: user.uid,
      });

      if (user.role === "admin") {
        await updateTicket(id, { ticketSeen: false });
      }

      await fetchTickets();
      reset();
    } catch {
      setError(true);
    }
  }

  return (
    <Container size="medium">
      <form id="addMessageToTicket" onSubmit={handleSubmit(onSubmit)}>
        <Card>
          {error && <ErrorMessage>Oops something went wrong</ErrorMessage>}

          <FieldTextArea
            label="Message"
            {...register("ticketMessage", { required: true })}
            error={messageErrors[errors?.ticketMessage?.type]}
          />

          <Button
            type="submit"
            fullWidth
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            Add Message
          </Button>
        </Card>
      </form>
    </Container>
  );
};
