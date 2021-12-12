import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { getTicket } from '../services/ticketServices';
import { capitalize } from '../utils/stringUtils';

export const Ticket = (props) => {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTicket(id)
    .then(ticket => setTicket(ticket))
    .catch(error => console.log(error))
    .finally(setLoading(false))
  }, [])

  if(!post) {
    return(
      <p>Ooops we couldn't find your ticket</p>
    )
  }

  return(
    <>
      <h1>{capitalize(ticket.subject)}</h1>
      <h3>{capitalize(ticket.category)}</h3>
      <Moment fromNow>{ticket.updated_at}</Moment> - 
      <Moment>{ticket.updated_at}</Moment>
      <p>{ticket.message}</p>
    </>
  )
}