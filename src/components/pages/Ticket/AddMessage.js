import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTickets } from "config/useTickets";
import { Container, Card } from "components/atoms/layout";
import { FieldTextArea } from "components/atoms/form";
import { Button } from "components/atoms/button";
import { ErrorMessage } from "components/atoms/typo";
import { addMessageToTicket, updateTicket } from "services/ticketServices";
import { useGlobalState } from "config/store";

export const AddMessage = () => {
  const { id } = useParams();
  const {
    store: { user },
  } = useGlobalState();
  const { fetchTickets } = useTickets();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [formState, setFormState] = useState({
    ticketMessage: "",
  });

  function handleChange(event) {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError(false);

    try {
      await addMessageToTicket(id, {
        ...formState,
        ticketUserID: user.uid,
      });

      if (user.role === "admin") {
        await updateTicket(id, { ticketSeen: false });
      }

      await fetchTickets();
      setFormState({ ticketMessage: "" });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container size="medium">
      <form id="addMessageToTicket" onSubmit={handleSubmit}>
        <Card>
          {error && <ErrorMessage>Oops something went wrong</ErrorMessage>}

          <FieldTextArea
            label="Message"
            name="ticketMessage"
            onChange={handleChange}
            value={formState.ticketMessage}
          />

          <Button
            type="submit"
            fullWidth
            disabled={loading}
            isLoading={loading}
          >
            Add Message
          </Button>
        </Card>
      </form>
    </Container>
  );
};
