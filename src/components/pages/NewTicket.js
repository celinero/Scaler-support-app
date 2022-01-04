import React, { useState } from 'react';
import { useGlobalState } from 'config/store';
import { useTickets } from 'config/useTickets';
import { createNewTicket } from 'services/ticketServices';
import {Block, Label, Input, TextArea, InputButton, Select, Option} from 'components/atoms'
import { capitalize } from 'utils/stringUtils';


export const NewTicket = (props) => {
  const { store: { user, categories }, dispatch } = useGlobalState();
  const tickets = useTickets()

  const [formState, setFormState] = useState({
    ticketSubject: "",
    ticketCategoryID: "",
    ticketMessage: ""
  });

  function addNewTicket(){
    dispatch({type: 'tickets:fetch' })
      
    createNewTicket({
      ...formState,
      ticketUserID: user.data.uid
    })
      .then(() => {
        tickets.refresh()
      })
      .catch(error => {
        console.log(error)
      })
  }

  function handleChange(event) {
    setFormState({
        ...formState,
        [event.target.name]: event.target.value
    })
  }


  function handleSubmit(event) {
    event.preventDefault();
    addNewTicket();
  }

  return(
    <div>
      <h1>Add a support ticket</h1>
      <form id="newTicketForm" onSubmit={handleSubmit}>
        <Block>
          <Label>Subject</Label>
          <Input type="text" name="ticketSubject" placeholder="Enter Subject" value={formState.ticketSubject} onChange={handleChange} required />
        </Block>
        <Block>
          <Label>Category</Label>
          <Select name="ticketCategoryID" onChange={handleChange} required defaultValue="">
            <Option disabled hidden value="">Select Category:</Option>
            {categories.data.map(category => (
              <Option key={category._id} value={category._id}>{capitalize(category.name)}</Option>
            ))}
          </Select>
        </Block>
        <Block>
          <Label>Message</Label>
          <TextArea from="newTicket" type="text" name="ticketMessage" placeholder="Enter Message"  value={formState.ticketMessage} onChange={handleChange} required />
        </Block>
        <Block>
          <button type="submit" disabled={tickets.loading}>Add Ticket</button>
        </Block>
      </form>
    </div>
  )
}