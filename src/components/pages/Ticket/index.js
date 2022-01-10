import React from 'react';
import { useParams } from 'react-router-dom';
import { useTickets } from 'config/useTickets';

import { Container, InnerContainerEnd, Card, TitleH2, StyledLinkButton, Block, Label, TextArea} from 'components/atoms';
import { capitalize } from 'utils/stringUtils';

import { useGlobalState } from 'config/store';

import { AddMessage } from './AddMessage'

export const Ticket = () => {
  const { id } = useParams();
  const { store: { categories } } = useGlobalState();
  const tickets = useTickets();
  const ticket = tickets.data.find(t => t._id.toString() === id)
  const category = categories.data.find(c => c._id.toString() === ticket?.ticketCategoryID)

  if (!tickets.completed) {
    return <>loading...</>
  }

  if (tickets.error || !tickets) {
    return <>oops something went wrong</>
  }

  return (
    <Container>
      {ticket.ticketMessages
      .sort((a, b) => a.ticketDate - b.ticketDate)
      .map(({ ticketMessage, ticketDate }, index) => {
        return <Card key={ticketDate}>
          {index === 0 && (
            <>
              <TitleH2>{capitalize(ticket.ticketSubject)}</TitleH2>
              {categories.loading && <h4>loading...</h4>}
              {!categories.loading && !category && <h4>Unknown category</h4>}
              {!categories.loading && category && <h4>{category.name}</h4>}
            </>
          )}
          <p>{new Date(ticketDate).toString()}</p>
          <p>{ticketMessage}</p>
        </Card>
      })}
      <br />
      <br />

      <AddMessage />

      <br />
      <br />
      <InnerContainerEnd>
        <StyledLinkButton to={`/user/tickets/`}>Back</StyledLinkButton>
      </InnerContainerEnd>
    </Container>
  )
}