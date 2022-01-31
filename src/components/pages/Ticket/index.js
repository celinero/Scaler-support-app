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
    store: { categories, user },
  } = useGlobalState();
  const tickets = useTickets();
  const ticket = tickets.data.find((t) => t._id.toString() === id);
  const category = categories.data.find(
    (c) => c._id.toString() === ticket?.ticketCategoryID
  );

  // means that ticket's update has been seen
  // by ticket's owner
  const isNowSeen =
    !ticket?.ticketSeen && user.data.uid === ticket?.ticketUserID;

  useEffect(() => {
    if (id && isNowSeen) {
      updateTicket(id, { ticketSeen: true }).then(() => {
        tickets.refresh();
      });
    }
  }, [id, isNowSeen]);

  if (!tickets.completed) {
    return <>loading...</>;
  }

  if (tickets.error || !tickets) {
    return <>oops something went wrong</>;
  }

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
                  tickets.refresh();
                });
              }}
            >
              {ticket.ticketResolved ? "Unresolve" : "Resolve"}
            </Button>
          }
        >
          <Pill style={{ marginBottom: 10, marginLeft: -10 }}>
            {category.name}
          </Pill>
          <h1>{capitalize(ticket.ticketSubject)}</h1>
        </PageHeader>

        {ticket.ticketMessages
          .sort((a, b) => a.ticketDate - b.ticketDate)
          .map(({ ticketMessage, ticketDate, ticketUserID }, index) => {
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
