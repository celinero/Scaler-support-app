import React from "react";
import { useTickets } from "config/useTickets";
import { useGlobalState } from "config/store";
import { Container, Card } from "components/atoms/layout";
import { ButtonLink } from "components/atoms/button";
import { PreviewTicket } from "components/molecules/PreviewTicket";
import { CardHeader, ButtonWrapper } from "./styles";

export const Tickets = () => {
  const tickets = useTickets();
  const {
    store: { user, categories },
  } = useGlobalState();

  if (tickets.error) {
    return <>oops something went wrong</>;
  }

  if (tickets.loading || !tickets.completed) {
    return <>loading...</>;
  }

  const addCategory = (ticket) => {
    return {
      ...ticket,
      category: categories.data.find(
        (c) => c._id.toString() === ticket?.ticketCategoryID
      )?.name,
    };
  };

  const activeTickets = tickets.data
    .filter((ticket) => !ticket.ticketResolved)
    .map(addCategory);

  const resolvedTickets = tickets.data
    .filter((ticket) => ticket.ticketResolved)
    .map(addCategory);

  return (
    <Container>
      <Card style={{ marginTop: 50 }}>
        <CardHeader>
          <div style={{ flexGrow: 1 }}>
            <h1 style={{ marginBottom: 5 }}>Hi {user.data.displayName}</h1>
            {!!activeTickets.length && (
              <p>
                You have {activeTickets.length} active support ticket
                {activeTickets.length > 1 && "s"}.
              </p>
            )}
            {!activeTickets.length && <p>You have 0 active support ticket.</p>}
          </div>
          <ButtonWrapper>
            <p style={{ marginBottom: 5 }}>Need help?</p>
            <ButtonLink to="/user/tickets/new">Create a new ticket</ButtonLink>
          </ButtonWrapper>
        </CardHeader>
      </Card>

      {!!activeTickets.length && (
        <div style={{ marginTop: 50 }}>
          <h2>Active tickets</h2>
          {activeTickets.map((ticket) => (
            <PreviewTicket key={ticket._id} {...ticket} />
          ))}
        </div>
      )}

      {!!resolvedTickets.length && (
        <div style={{ marginTop: 50 }}>
          <h2>Resolved tickets</h2>
          {resolvedTickets.map((ticket) => (
            <PreviewTicket key={ticket._id} {...ticket} resolved />
          ))}
        </div>
      )}
    </Container>
  );
};
