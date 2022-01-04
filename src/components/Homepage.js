import React from 'react';
// import { useNavigate } from 'react-router';
import { useGlobalState } from '../config/store';
import  Tickets   from './Tickets';
import { StyledLink } from '../styled-components'

export const Homepage = () => {
  // const navigate = useNavigate();
  const {store, dispatch} = useGlobalState();
  const {loggedInUser} = store;

  return(
    <>
      <h1>Scaler Support App</h1>
      <img src={"../images/hero-image.jpeg"} alt="" />

      {loggedInUser ?
        (<Tickets />)
        :
        (<StyledLink to="/login">Log in</StyledLink>)
      }
    
    </>
  )

}
  