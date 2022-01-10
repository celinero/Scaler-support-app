import React from 'react';
import { useTickets } from 'config/useTickets';
import { useGlobalState } from 'config/store';
import { Container, InnerContainer, Card, TitleH1, TitleH3, StyledLink} from 'components/atoms';
import { PreviewTicket } from 'components/molecules/PreviewTicket'


export const Tickets = () => {
  const tickets = useTickets();
  const { store: { user } } = useGlobalState();

  if (tickets.error) {
    return <>oops something went wrong</>
  }

  if (tickets.loading || !tickets.completed) {
    return <>loading...</>
  }

  return(
    <Container>
      <InnerContainer>
        <div>
          <TitleH1>Hi  {user.data.displayName},</TitleH1>
          {/* <TitleH2>Licence number: </TitleH2> */}
          {/* {user.data.licenseNumber} */}
          <TitleH3>You have {tickets.data.length} support tickets found:</TitleH3>
        </div>
        <Card>
          <p>Need help?</p>
          <StyledLink to="/user/tickets/new">Create a new ticket</StyledLink>
        </Card>
      </InnerContainer>
      <div>
        {tickets
          .data.sort((a, b) => b.updated_at - a.updated_at)
          .map(ticket => (<PreviewTicket key={ticket._id} ticketId={ticket._id} />))
        }
      </div>
    </Container>
  )
}
