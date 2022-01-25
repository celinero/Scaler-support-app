import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useGlobalState } from "config/store";
import { useTickets } from "config/useTickets";
import { createNewTicket } from "services/ticketServices";
import {
  OuterContainerWhite,
  FormTicket,
  Title,
  InputContainer,
  InputTicket,
  CutTicket,
  Select,
  Placeholder,
  Submit,
  Option,
  TextArea,
} from "components/atoms/form";
import { capitalize } from "utils/stringUtils";

export const NewTicket = (props) => {
  const navigate = useNavigate();
  const {
    store: { user, categories },
    dispatch,
  } = useGlobalState();
  const tickets = useTickets();

  const [formState, setFormState] = useState({
    ticketSubject: "",
    ticketCategoryID: "",
    ticketMessage: "",
  });

  function addNewTicket() {
    dispatch({ type: "tickets:fetch" });

    createNewTicket({
      ...formState,
      ticketUserID: user.data.uid,
    })
      .then(() => {
        tickets.refresh();
        navigate("/user/tickets");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleChange(event) {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    addNewTicket();
  }

  return (
    <OuterContainerWhite>
      <FormTicket id="newTicketForm" onSubmit={handleSubmit}>
        <Title>Create a new a support ticket</Title>
        <InputContainer>
          <InputTicket
            type="text"
            name="ticketSubject"
            placeholder=" "
            value={formState.ticketSubject}
            onChange={handleChange}
            required
          />
          <CutTicket className="cutTicket" />
          <Placeholder className="placeholder">Subject</Placeholder>
        </InputContainer>
        <InputContainer>
          <Select
            name="ticketCategoryID"
            onChange={handleChange}
            required
            defaultValue=""
          >
            <Option disabled hidden value=""></Option>
            {categories.data.map((category) => (
              <Option key={category._id} value={category._id}>
                {capitalize(category.name)}
              </Option>
            ))}
          </Select>
          <CutTicket className="cutTicket" />
          <Placeholder className="placeholder">Category</Placeholder>
        </InputContainer>
        <InputContainer>
          <TextArea
            from="newTicket"
            type="text"
            name="ticketMessage"
            placeholder=" "
            value={formState.ticketMessage}
            onChange={handleChange}
            required
          />
          <CutTicket className="cutTicket" />
          <Placeholder className="placeholder">Message</Placeholder>
        </InputContainer>
        <Submit type="submit" disabled={tickets.loading}>
          Add Ticket
        </Submit>
      </FormTicket>
    </OuterContainerWhite>
  );
};
