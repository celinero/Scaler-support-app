import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useGlobalState } from '../config/store';
import { createNewTicket } from '../services/ticketServices';
import {Block, Label, Input, TextArea, InputButton, Select, Option} from '../styled-components/index'
import { capitalize } from '../utils/stringUtils';
import { parseError } from '../config/api';

export const NewTicket = (props) => {
  const navigate = useNavigate();
  const {store, dispatch} = useGlobalState();
  const {tickets, categories} = store;
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formState, setFormState] = useState({
    ticketSubject: "",
    ticketCategoryID: "",
    ticketMessage: "",
    ticketUserID: "boblebricoleur"
  });

  function addNewTicket(ticketObject){
    setLoading(true)
    createNewTicket(ticketObject)
      .then(newTicket => {
        dispatch({
          type: "setTickets",
          data: [...tickets, newTicket]
        })
        setLoading(false)
        navigate("/tickets/:id")
      })
      .catch(error => {
        const message = parseError(error);
        setErrorMessage(message)
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
    addNewTicket(formState);
  }

  return(
    <div>
      <h1>Add a support ticket</h1>
      <form id="newTicketForm" onSubmit={handleSubmit}>
        {errorMessage && <p>{errorMessage}</p>}
        <Block>
          <Label>Subject</Label>
          <Input type="text" name="ticketSubject" placeholder="Enter Subject" value={formState.ticketSubject} onChange={handleChange} required />
        </Block>
        <Block>
          <Label>Category</Label>
          <Select name="ticketCategoryID" onChange={handleChange} required defaultValue="">
            <Option disabled hidden value="">Select Category:</Option>
            {categories.map(category => (
              <Option key={category._id} value={category._id}>{capitalize(category.name)}</Option>
            ))}
          </Select>
        </Block>
        <Block>
          <Label>Message</Label>
          <TextArea from="newTicket" type="text" name="ticketMessage" placeholder="Enter Message"  value={formState.ticketMessage} onChange={handleChange} required />
        </Block>
        <Block>
          <InputButton disabled={loading} type="submit" value="Add Ticket"></InputButton>
        </Block>
      </form>
    </div>
  )
}