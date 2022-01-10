import React from 'react';
import { useParams } from 'react-router-dom';
import { useTickets } from 'config/useTickets';

import { Container, InnerContainerEnd, Card, TitleH2, StyledLinkButton} from 'components/atoms';
import { capitalize } from 'utils/stringUtils';

import { useGlobalState } from 'config/store';

export const Ticket = () => {
  const { id } = useParams();
  const { store: { categories } } = useGlobalState();
  const tickets = useTickets();
  const ticket = tickets.data.find(t => t._id.toString() === id)
  const category = categories.data.find(c => c._id.toString() === ticket?.ticketCategoryID)

  if (tickets.loading || !tickets.completed) {
    return <>loading...</>
  }

  if (tickets.error || !tickets) {
    return <>oops something went wrong</>
  }

  return (
    <Container>
      <Card>
        <TitleH2>{capitalize(ticket.ticketSubject)}</TitleH2>
        {categories.loading && <h4>loading...</h4>}
        {!categories.loading && !category && <h4>Unknown category</h4>}
        {!categories.loading && category && <h4>{category.name}</h4>}
        <p>{ticket.ticketMessage}</p>
      </Card>
      <InnerContainerEnd>
        <StyledLinkButton to={`/user/tickets/${ticket._id}`}>Update</StyledLinkButton>
        <StyledLinkButton to={`/user/tickets/`}>Back</StyledLinkButton>
      </InnerContainerEnd>
    </Container>
  )
}