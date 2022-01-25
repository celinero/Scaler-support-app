import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTickets } from 'config/useTickets';

import { Container, InnerContainerEnd, Card, TitleH2, StyledLinkButton } from 'components/atoms';
import { Bubble } from 'components/atoms/bubble';
import { Button, Status } from 'components/atoms/ticket';
import { capitalize } from 'utils/stringUtils';
import { updateTicket } from 'services/ticketServices';

import { useGlobalState } from 'config/store';

import { AddMessage } from './AddMessage'

export const Ticket = () => {
  const { id } = useParams();
  const { store: { categories, user } } = useGlobalState();
  const tickets = useTickets();
  const ticket = tickets.data.find(t => t._id.toString() === id)
  const category = categories.data.find(c => c._id.toString() === ticket?.ticketCategoryID)

  useEffect((id, tickets) => {
    if (!ticket?.ticketSeen) {
      updateTicket(id, { ticketSeen: true })
        .then(() => {
          tickets.refresh();
        });
    }
  }, [ticket?.ticketSeen])

  if (!tickets.completed) {
    return <>loading...</>
  }

  if (tickets.error || !tickets) {
    return <>oops something went wrong</>
  }

  console.log(user)

  return (
    <Container>
      <Status>
        {ticket.ticketResolved && 'Resolved'}
        {!ticket.ticketSeen && 'Updated'}
        {!ticket.ticketResolved && 'Pending'}
      </Status>
      {ticket.ticketMessages
        .sort((a, b) => a.ticketDate - b.ticketDate)
        .map(({ ticketMessage, ticketDate, ticketUserID }, index) => {


          console.log(ticket.ticketUserID, ticketUserID)

          return <Bubble key={ticketDate} isRight={ticket.ticketUserID !== ticketUserID}>
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
          </Bubble>
        })}
      <br />
      <br />

      <AddMessage />

      <br />
      <br />

      <InnerContainerEnd>
        <Button onClick={() => {
          updateTicket(id, { ticketResolved: !ticket.ticketResolved })
            .then(() => {
              tickets.refresh();
            });
        }}>{ticket.ticketResolved ? 'Unresolve' : 'Resolve'}</Button>

        <StyledLinkButton to={`/user/tickets/`}>Back</StyledLinkButton>
      </InnerContainerEnd>
    </Container>
  )
}