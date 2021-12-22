import React from 'react';
import Moment from 'react-moment';
import { useParams } from 'react-router';
import { useGlobalState } from '../config/store';
import { capitalize } from '../utils/stringUtils';

export const Ticket = (props) => {
  const { id } = useParams();
  const { store } = useGlobalState();
  const { tickets, categories } = store;

  const ticket = tickets.find(t => t._id.toString() === id);

  if (!ticket) {
    return (
      <p>Ooops couldn't find the ticket</p>
    )
  }

  const category = categories.find(c => c._id.toString() === ticket.ticketCategoryID)

  return(
    <>
      <h1>{capitalize(ticket.ticketSubject)}</h1>
      <h3>{capitalize(category.name)}</h3>
      {/* <Moment fromNow>{ticket.updated_at}</Moment> - 
      <Moment>{ticket.updated_at}</Moment> */}
      <p>{ticket.ticketMessage}</p>
    </>
  )
}