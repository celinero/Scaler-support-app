import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTickets } from "config/useTickets";
import { Container, PageHeader } from "components/atoms/layout";
import { Button, TextLink } from "components/atoms/button";
import { Pill, Info } from "components/atoms/typo";
import { capitalize } from "utils/stringUtils";
import { updateTicket } from "services/ticketServices";
import { useGlobalState } from "config/store";
import { BubbleWrapper, Bubble } from "./styles";
import { AddMessage } from "./AddMessage";

export const Ticket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    store: { user },
  } = useGlobalState();
  const { tickets, fetchTickets } = useTickets();
  const ticket = tickets.find((t) => t._id.toString() === id);
  const [loading, setLoading] = useState(false);

  // means that ticket's update has been seen
  // by ticket's owner
  const isNowSeen = !ticket?.ticketSeen && user.uid === ticket?.ticketUserID;

  useEffect(() => {
    if (id && isNowSeen) {
      updateTicket(id, { ticketSeen: true }).then(() => {
        fetchTickets();
      });
    }
  }, [id, isNowSeen, fetchTickets]);

  return (
    <>
      <Container size="medium" style={{ marginBottom: 25 }}>
        <PageHeader
          style={{ marginBottom: 25 }}
          cta={
            <>
              <TextLink to="/user/tickets">Back</TextLink>
              <Button
                secondary
                style={{ marginLeft: 10 }}
                isLoading={loading}
                onClick={async () => {
                  setLoading(true);
                  await updateTicket(id, {
                    ticketResolved: !ticket.ticketResolved,
                  });
                  await fetchTickets();
                  setLoading(false);
                  navigate("/user/tickets");
                }}
              >
                {ticket.ticketResolved ? "Reopen" : "Solve"}
              </Button>
            </>
          }
        >
          <Pill style={{ marginBottom: 10, marginLeft: -10 }}>
            {ticket.ticketCategoryName}
          </Pill>
          <h1>{capitalize(ticket.ticketSubject)}</h1>
        </PageHeader>

        {ticket.ticketMessages
          .sort((a, b) => a.ticketDate - b.ticketDate)
          .map(
            ({
              ticketMessage,
              ticketDate,
              ticketUserID,
              ticketUserDisplayname,
              ticketUserRole,
            }) => {
              return (
                <BubbleWrapper
                  key={ticketDate}
                  isRight={ticket.ticketUserID !== ticketUserID}
                >
                  <Bubble isRight={ticket.ticketUserID !== ticketUserID}>
                    <strong>{ticketUserDisplayname}</strong>
                    <Info>
                      {` `}| {ticketUserRole} |{` `}
                      {new Date(ticketDate).toLocaleDateString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Info>
                    <p style={{ marginTop: 10 }}>{ticketMessage}</p>
                  </Bubble>
                </BubbleWrapper>
              );
            }
          )}
      </Container>
      <AddMessage />
    </>
  );
};
