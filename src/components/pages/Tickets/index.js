import React from "react";
import { useTickets } from "config/useTickets";
import { useGlobalState } from "config/store";
import { Container, PageHeader } from "components/atoms/layout";
import { ButtonLink } from "components/atoms/button";
import { PreviewTicket } from "components/molecules/PreviewTicket";

export const Tickets = () => {
  const tickets = useTickets();
  const {
    store: { user, categories },
  } = useGlobalState();

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
      <PageHeader
        cta={
          <>
            <p style={{ marginBottom: 5 }}>Need help?</p>
            <ButtonLink to="/user/tickets/new">Create a new ticket</ButtonLink>
          </>
        }
      >
        <h1 style={{ marginTop: 5 }}>Hi {user.data.displayName}</h1>
        {!!activeTickets.length && (
          <p>
            You have {activeTickets.length} active support ticket
            {activeTickets.length > 1 && "s"}.
          </p>
        )}
        {!activeTickets.length && <p>You have 0 active support ticket.</p>}
      </PageHeader>

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
