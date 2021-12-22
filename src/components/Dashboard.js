import React from 'react';
import { Card } from '../styled-components';
import { useGlobalState } from '../config/store';
import { capitalize, trunctcate } from '../utils/stringUtils';
import { Link } from 'react-router-dom';
// import Moment from 'react-moment';

export const Dashboard = ({ ticketId }) => {
  const { store } = useGlobalState();
  const { tickets, categories } = store;
  const ticket = tickets.find(t => t._id.toString() === ticketId)
  const category = categories.find(c => c._id.toString() === ticket.ticketCategoryID)

  return (
    <Card>
      <Link to={`/tickets/${ticket._id}`}><h3>{capitalize(ticket.ticketSubject)}</h3></Link>
      <h4>{capitalize(category.name)}</h4>
      
      {/* <Moment fromNow>{ticket.updated_at}</Moment> */}
      <p>{trunctcate(ticket.ticketMessage, 100)}</p>
    </Card>
  )
}