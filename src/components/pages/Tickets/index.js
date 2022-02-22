import React from "react";
import { useTickets } from "config/useTickets";
import { useGlobalState } from "config/store";
import { Container, PageHeader } from "components/atoms/layout";
import { ButtonLink } from "components/atoms/button";
import { PreviewTicket } from "components/molecules/PreviewTicket";

// Tickets
// display all the tickets
// > from a specific user if current user is role "user"
// > from all users if current user is role "admin"
export const Tickets = () => {
  const { tickets } = useTickets();
  const {
    store: { user },
  } = useGlobalState();

  const sortedTickets = tickets.sort((a, b) => b.ticketDate - a.ticketDate);
  const activeTickets = sortedTickets.filter(
    (ticket) => !ticket.ticketResolved
  );
  const solvedTickets = sortedTickets.filter((ticket) => ticket.ticketResolved);

  // identify user's role to drive the differnet UI
  const isAdmin = user.role === "admin";

  return (
    <Container>
      <PageHeader
        cta={
          !isAdmin && (
            <>
              {/*
               * if user is not admin,
               * then show the "create a new ticket" call to action
               */}
              <p style={{ marginBottom: 5 }}>Need help?</p>
              <ButtonLink to="/user/tickets/new">
                Create a new ticket
              </ButtonLink>
            </>
          )
        }
      >
        <h1 style={{ marginTop: 5 }}>Hi {user.displayName}</h1>
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

      {!!solvedTickets.length && (
        <div style={{ marginTop: 50 }}>
          <h2>Solved tickets</h2>
          {solvedTickets.map((ticket) => (
            <PreviewTicket key={ticket._id} {...ticket} resolved />
          ))}
        </div>
      )}
    </Container>
  );
};
