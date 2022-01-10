import React from 'react';
// import { Link } from 'react-router-dom';

import { capitalize, trunctcate } from 'utils/stringUtils';

import { useGlobalState } from 'config/store';

import { Card, StyledLink } from 'components/atoms';


export const PreviewTicket = ({ ticketId }) => {
  const { store: { tickets, categories }} = useGlobalState();
  const ticket = tickets.data.find(t => t._id.toString() === ticketId)
  const category = categories.data.find(c => c._id.toString() === ticket?.ticketCategoryID)

  if (tickets.loading && !ticket) {
    return <>loading...</>
  }

  if (!ticket) {
    return <>oops something went wrong</>
  }

  return (
    <Card>
      <StyledLink to={`/user/tickets/${ticket._id}`}><h3>{capitalize(ticket.ticketSubject)}</h3></StyledLink>
      {categories.loading && <h4>loading...</h4>}
      {!categories.loading && !category && <h4>Unknown category</h4>}
      {!categories.loading && category && <h4>{category.name}</h4>}
      <p>{trunctcate(ticket.ticketMessage, 100)}</p>
    </Card>
  )
}