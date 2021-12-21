import React, { useEffect, useState} from 'react';
import Moment from 'react-moment';
import { useParams } from 'react-router';
import { useGlobalState } from '../config/store';
import { getTicket } from '../services/ticketServices';
import { capitalize } from '../utils/stringUtils';

export const Ticket = (props) => {

  const { store } = useGlobalState();
  const { tickets } = store;
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const {id} = useParams()


  useEffect(() => {
    getTicket(id)
    .then(ticket => setTicket(ticket))
    .catch(error => console.log(error))
    .finally(() => setLoading(false))
  }, [tickets])

  if(loading) {
    return(
      <p>Loading</p>
    )
  }

  if(!ticket && !loading) {
    return(
      <p>Ooops couldn't find the ticket</p>
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