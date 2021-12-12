import React from 'react';
import { Card } from '../styled-components';
import { capitalize, trunctcate } from '../utils/stringUtils';
import Moment from 'react-moment';

export const Dashboard = (props) => {
const { ticket } = props;

  return (
    <Card>
      <h3>{ticket.title}</h3>
      <h4>{capitalize(ticket.category)}</h4>
      <Moment>{postMessage.updated_at}</Moment>
      <p>{trunctcate(ticket.message, 100)}</p>
    </Card>
  )
}