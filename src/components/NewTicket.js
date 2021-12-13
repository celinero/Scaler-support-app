import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {Block, Label, Input, TextArea, InputButton} from '../styled-components/index'

export const NewTicket = (props) => {
  const navigate = useNavigate()

  const initialState = {
    subject: "",
    category: "",
    message: ""
  }

  const { addNewTicket } = props;
  const [formState, setFormState] = useState(initialState);

  function handleChange(event) {
    setFormState({
        ...formState,
        [event.target.name]: event.target.value
    })

  }

  function handleSubmit(event) {
    event.preventDefault();
    addNewTicket(formState);
    navigate("/tickets");
  }


  return(
    <div>
      <h1>Add a support ticket</h1>
      <form id="newTicketForm" onSubmit={handleSubmit}>
        <Block>
          <Label>Subject</Label>
          <Input type="text" name="subject" placeholder="Enter Subject" value={formState.subject} onChange={handleChange} />
        </Block>
        <Block>
          <Label>Category</Label>
          <Input type="text" name="category" placeholder="Enter Category" value={formState.category} onChange={handleChange} />
        </Block>
        <Block>
          <Label>Message</Label>
          <TextArea from="newTicket" type="text" name="message" placeholder="Enter Message"  value={formState.message} onChange={handleChange} />
        </Block>
        <Block>
          <InputButton type="submit" value="Add Ticket"></InputButton>
        </Block>
      </form>
    </div>
  )
}