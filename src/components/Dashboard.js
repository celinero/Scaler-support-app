import React from 'react';
import { Card } from '../styled-components';
import { capitalize, trunctcate } from '../utils/stringUtils';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

export const Dashboard = (props) => {
const { ticket } = props;

  return (
    <Card>
      <Link to={`/tickets/${ticket.id}`}><h3>{capitalize(ticket.subject)}</h3></Link>
      <h4>{capitalize(ticket.category)}</h4>
      <Moment fromNow>{ticket.updated_at}</Moment>
      <p>{trunctcate(ticket.message, 100)}</p>
    </Card>
  )
}