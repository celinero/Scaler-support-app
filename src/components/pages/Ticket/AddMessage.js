import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTickets } from 'config/useTickets';
import { Block, Label, TextArea} from 'components/atoms';
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
    <form id="addMessageToTicket" onSubmit={handleSubmit}>
      <Block>
        <Label>Message</Label>
        <TextArea from="newTicket" type="text" name="ticketMessage" placeholder="Enter Message"  value={formState.ticketMessage} onChange={handleChange} required />
      </Block>
      <Block>
        <button type="submit" disabled={loading}>Add Message</button>
      </Block>
    </form>
  )
}