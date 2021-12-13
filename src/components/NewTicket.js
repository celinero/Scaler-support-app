import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useGlobalState } from '../config/store';
import { createNewTicket } from '../services/ticketServices';
import {Block, Label, Input, TextArea, InputButton, Select, Option} from '../styled-components/index'
import categories from '../data/categories'
import { capitalize } from '../utils/stringUtils';

export const NewTicket = (props) => {
  const navigate = useNavigate();
  const {store, dispatch} = useGlobalState();
  const {tickets} = store;
  const [loading, setLoading] = useState(false);

  const initialState = {
    subject: "",
    category: "",
    message: ""
  }


  const [formState, setFormState] = useState(initialState);

  function addNewTicket(ticketObject){
    createNewTicket(ticketObject)
      .then(newTicket => {
        dispatch({
        type: "setTickets",
        data: [...tickets, newTicket]
      })
      navigate("/")
      })
      .catch(error => console.log(error))
     
      
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
        <Block>
          <Label>Subject</Label>
          <Input type="text" name="subject" placeholder="Enter Subject" value={formState.subject} onChange={handleChange} />
        </Block>
        <Block>
          <Label>Category</Label>
          <Select name="category" defaultValue="" onChange={handleChange} >
            <Option disabled hidden value="" >Select Category:</Option>
            {categories.map(category => (<Option key ={category.id} value={category.name}>{capitalize(category.name)}</Option>))}
          </Select>
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