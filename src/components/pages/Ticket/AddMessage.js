import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTickets } from 'config/useTickets';

import { FormTicket, InputContainer, TextArea, CutTicket, Placeholder} from 'components/atoms/form';
import {  Button } from 'components/atoms/ticket';
import { addMessageToTicket } from 'services/ticketServices'
import { useGlobalState } from 'config/store';

export const AddMessage = () => {
  const { id } = useParams();
  const { store: { user } } = useGlobalState();
  const tickets = useTickets();

  const [loading, setLoading] = useState(false)

  const [formState, setFormState] = useState({
    ticketMessage: ""
  });

  function handleChange(event) {
    setFormState({
        ...formState,
        [event.target.name]: event.target.value
    })
  }

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    addMessageToTicket(id, {
      ...formState,
      ticketUserID: user.data.uid
    })
      .then(() => {
        setFormState({ ticketMessage: "" });
        setLoading(false);
        tickets.refresh();
      });
  }

  return (
    <FormTicket id="addMessageToTicket" onSubmit={handleSubmit}>
      <InputContainer>
        <TextArea from="newTicket" type="text" name="ticketMessage" placeholder=" "  value={formState.ticketMessage} onChange={handleChange} required />
        <CutTicket className="cutTicket" />
        <Placeholder className="placeholder">Add a message</Placeholder>
      </InputContainer>
      <Button type="submit" disabled={loading}>Add Message</Button>
    </FormTicket>
  )
}