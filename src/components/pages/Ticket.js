import React from 'react';
import { useParams } from 'react-router-dom';

import { capitalize } from 'utils/stringUtils';

import { useGlobalState } from 'config/store';

export const Ticket = () => {
  const { id } = useParams();
  const { store: { tickets, categories }} = useGlobalState();
  const ticket = tickets.data.find(t => t._id.toString() === id)
  const category = categories.data.find(c => c._id.toString() === ticket.ticketCategoryID)

  if (tickets.loading) {
    return <>loading...</>
  }

  if (!ticket) {
    return <>oops something went wrong</>
  }

  return (
    <div>
     <h3>{capitalize(ticket.ticketSubject)}</h3>
      {categories.loading && <h4>loading...</h4>}
      {!categories.loading && !category && <h4>Unknown category</h4>}
      {!categories.loading && category && <h4>{category.name}</h4>}
      <p>{ticket.ticketMessage}</p>
    </div>
  )
}