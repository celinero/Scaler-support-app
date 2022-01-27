import React from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight, MdNotificationsNone } from "react-icons/md";
import { capitalize, trunctcate } from "utils/stringUtils";
import { Pill } from "components/atoms/typo";
import { CardLink, IconWrapper, Notification } from "./styles";

export const PreviewTicket = ({
  _id,
  ticketSubject,
  ticketMessages,
  ticketSeen,
  category,
  resolved,
}) => {
  const navigate = useNavigate();

  return (
    <CardLink
      as="a"
      style={{ opacity: resolved && 0.65 }}
      href={`/user/tickets/${_id}`}
      onClick={(e) => {
        e.preventDefault();
        navigate(`/user/tickets/${_id}`);
      }}
    >
      <div>
        {!resolved && (
          <>
            <h3 style={{ marginBottom: 20 }}>{capitalize(ticketSubject)}</h3>
            <Pill style={{ marginBottom: 5 }}>{category}</Pill>
            <p>{trunctcate(ticketMessages[0].ticketMessage, 100)}</p>
          </>
        )}
        {resolved && <p>{capitalize(ticketSubject)}</p>}

        {!ticketSeen && (
          <Notification>
            <MdNotificationsNone size={24} color="white" />
          </Notification>
        )}

        <IconWrapper>
          <MdKeyboardArrowRight size={32} color="#02a3da" />
        </IconWrapper>
      </div>
    </CardLink>
  );
};
