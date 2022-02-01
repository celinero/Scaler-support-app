import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTickets } from "config/useTickets";
import { Container, PageHeader } from "components/atoms/layout";
import { Button } from "components/atoms/button";
import { Pill } from "components/atoms/typo";
import { capitalize } from "utils/stringUtils";
import { updateTicket } from "services/ticketServices";
import { useGlobalState } from "config/store";
import { BubbleWrapper, Bubble, Info } from "./styles";
import { AddMessage } from "./AddMessage";

export const Ticket = () => {
  const { id } = useParams();
  const {
    store: { user },
  } = useGlobalState();
  const { tickets, fetchTickets } = useTickets();
  const ticket = tickets.find((t) => t._id.toString() === id);

  // means that ticket's update has been seen
  // by ticket's owner
  const isNowSeen = !ticket?.ticketSeen && user.uid === ticket?.ticketUserID;

  useEffect(() => {
    if (id && isNowSeen) {
      updateTicket(id, { ticketSeen: true }).then(() => {
        fetchTickets();
      });
    }
  }, [id, isNowSeen]);

  return (
    <>
      <Container size="medium" style={{ marginBottom: 25 }}>
        <PageHeader
          style={{ marginBottom: 25 }}
          cta={
            <Button
              secondary
              onClick={() => {
                updateTicket(id, {
                  ticketResolved: !ticket.ticketResolved,
                }).then(() => {
                  fetchTickets();
                });
              }}
            >
              {ticket.ticketResolved ? "Unresolve" : "Resolve"}
            </Button>
          }
        >
          <Pill style={{ marginBottom: 10, marginLeft: -10 }}>
            {ticket.ticketCategoryName}
          </Pill>
          <h1>{capitalize(ticket.ticketSubject)}</h1>
        </PageHeader>

        {ticket.ticketMessages
          .sort((a, b) => a.ticketDate - b.ticketDate)
          .map(({ ticketMessage, ticketDate, ticketUserID }) => {
            return (
              <BubbleWrapper
                key={ticketDate}
                isRight={ticket.ticketUserID !== ticketUserID}
              >
                <Bubble isRight={ticket.ticketUserID !== ticketUserID}>
                  <Info>
                    {new Date(ticketDate).toLocaleDateString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Info>
                  <p>{ticketMessage}</p>
                </Bubble>
              </BubbleWrapper>
            );
          })}
      </Container>
      <AddMessage />
    </>
  );
};
