import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTickets } from "config/useTickets";
import { Container } from "components/atoms/layout";
import { Form, FieldTextArea } from "components/atoms/form";
import { Button } from "components/atoms/button";
import { addMessageToTicket } from "services/ticketServices";
import { useGlobalState } from "config/store";

export const AddMessage = () => {
  const { id } = useParams();
  const {
    store: { user },
  } = useGlobalState();
  const tickets = useTickets();

  const [loading, setLoading] = useState(false);

  const [formState, setFormState] = useState({
    ticketMessage: "",
  });

  function handleChange(event) {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    addMessageToTicket(id, {
      ...formState,
      ticketUserID: user.data.uid,
    }).then(() => {
      setFormState({ ticketMessage: "" });
      setLoading(false);
      tickets.refresh();
    });
  }

  return (
    <Container size="medium">
      <Form id="addMessageToTicket" onSubmit={handleSubmit}>
        <FieldTextArea
          label="Message"
          name="ticketMessage"
          onChange={handleChange}
          value={formState.ticketMessage}
        />

        <Button type="submit" fullWidth disabled={loading}>
          Add Message
        </Button>
      </Form>
    </Container>
  );
};
