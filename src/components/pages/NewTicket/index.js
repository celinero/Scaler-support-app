import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGlobalState } from "config/store";
import { useTickets } from "config/useTickets";
import { createNewTicket } from "services/ticketServices";
import { FieldText, FieldSelect, FieldTextArea } from "components/atoms/form";
import { ErrorMessage } from "components/atoms/typo";
import { Container, Card } from "components/atoms/layout";
import { Button } from "components/atoms/button";
import { capitalize } from "utils/stringUtils";

const subjectErrors = {
  required: "Subject required",
};

const categoryErrors = {
  validate: "Category required",
};

const messageErrors = {
  required: "Message required",
};

export const NewTicket = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const {
    store: { user, categories },
  } = useGlobalState();
  const { fetchTickets } = useTickets();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  async function onSubmit(formValues) {
    try {
      setError(false);
      await createNewTicket({
        ...formValues,
        ticketUserID: user.uid,
      });

      await fetchTickets();

      navigate("/user/tickets");
    } catch {
      setError(true);
    }
  }

  return (
    <Container size="medium">
      <form style={{ marginTop: 50 }} onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <div>
            <h1>Need some help?</h1>
            <p style={{ marginTop: 5 }}>Create a new support ticket</p>
          </div>

          {error && <ErrorMessage>Oops something went wrong</ErrorMessage>}

          <FieldText
            label="Subject"
            {...register("ticketSubject", { required: true })}
            error={subjectErrors[errors?.ticketSubject?.type]}
          />

          <FieldSelect
            label="Category"
            {...register("ticketCategoryID", {
              validate: (value) => !!value?.trim(),
            })}
            error={categoryErrors[errors?.ticketCategoryID?.type]}
          >
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {capitalize(category.name)}
              </option>
            ))}
          </FieldSelect>

          <FieldTextArea
            label="Message"
            {...register("ticketMessage", { required: true })}
            error={messageErrors[errors?.ticketMessage?.type]}
          />

          <Button
            type="submit"
            fullWidth
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            Add Ticket
          </Button>
        </Card>
      </form>
    </Container>
  );
};
