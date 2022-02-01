import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useGlobalState } from "config/store";
import { useTickets } from "config/useTickets";
import { createNewTicket } from "services/ticketServices";
import { FieldText, FieldSelect, FieldTextArea } from "components/atoms/form";
import { ErrorMessage } from "components/atoms/typo";
import { Container, Card } from "components/atoms/layout";
import { Button } from "components/atoms/button";
import { capitalize } from "utils/stringUtils";

export const NewTicket = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const {
    store: { user, categories },
  } = useGlobalState();
  const { fetchTickets } = useTickets();

  const [formState, setFormState] = useState({
    ticketSubject: "",
    ticketCategoryID: "",
    ticketMessage: "",
  });

  function addNewTicket() {
    setLoading(true);
    setError(false);

    createNewTicket({
      ...formState,
      ticketUserID: user.uid,
    })
      .then(() => {
        fetchTickets();
        setLoading(false);
        navigate("/user/tickets");
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
      });
  }

  function handleChange(event) {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    addNewTicket();
  }

  return (
    <Container size="medium">
      <form style={{ marginTop: 50 }} onSubmit={handleSubmit}>
        <Card>
          <div>
            <h1>Need some help?</h1>
            <p style={{ marginTop: 5 }}>Create a new support ticket</p>
          </div>

          {error && <ErrorMessage>Oops something went wrong</ErrorMessage>}

          <FieldText
            label="Subject"
            name="ticketSubject"
            onChange={handleChange}
            value={formState.ticketSubject}
          />

          <FieldSelect
            label="Category"
            name="ticketCategoryID"
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {capitalize(category.name)}
              </option>
            ))}
          </FieldSelect>

          <FieldTextArea
            label="Message"
            name="ticketMessage"
            onChange={handleChange}
            value={formState.ticketMessage}
          />

          <Button type="submit" fullWidth disabled={loading}>
            Add Ticket
          </Button>
        </Card>
      </form>
    </Container>
  );
};
