import React from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight, MdNotificationsNone } from "react-icons/md";
import { useGlobalState } from "config/store";
import { capitalize, trunctcate } from "utils/stringUtils";
import { Pill, Info } from "components/atoms/typo";
import { CardLink, IconWrapper, Notification } from "./styles";

export const PreviewTicket = ({
  _id,
  ticketSubject,
  ticketMessages,
  ticketSeen,
  ticketCategoryName,
  ticketUserDisplayname,
  ticketUserRole,
  ticketDate,
  resolved,
}) => {
  const navigate = useNavigate();
  const {
    store: {
      user: { role },
    },
  } = useGlobalState();

  console.log(ticketDate);

  const isAdmin = role === "admin";

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
          <Pill style={{ marginBottom: 15, marginLeft: -10, marginRight: 10 }}>
            {ticketCategoryName}
          </Pill>
        )}
        {isAdmin && (
          <>
            <strong>{ticketUserDisplayname}</strong>
            <Info>
              {` `}|{` `}
              {ticketUserRole}
              {` `}|{` `}
              {new Date(ticketDate).toLocaleDateString("en-US")}
            </Info>
          </>
        )}
        {!resolved && (
          <>
            <h3 style={{ marginBottom: 10 }}>{capitalize(ticketSubject)}</h3>
            <p>{trunctcate(ticketMessages[0].ticketMessage, 100)}</p>
          </>
        )}
        {resolved && (
          <p style={{ marginTop: 10 }}>{capitalize(ticketSubject)}</p>
        )}
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
