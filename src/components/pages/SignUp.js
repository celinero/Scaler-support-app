import React  from 'react';
// import { useNavigate } from 'react-router';
// import { useGlobalState } from '../config/store';
// import { logInUser } from '../services/userServices';
// import { Block, Label, Input, InputButton } from '../styled-components';
// import { parseError } from '../config/api';

export const SignUp = (props) => {
  // const [formValues, setFormValues] = useState({ email: "", username:"", password:"", password_confirmation:""});
  // const [errorMessage, setErrorMessage] = useState("");
  // const {dispatch} = useGlobalState();
  // const navigate = useNavigate();

  // function handleChange(event) {
  //   setFormValues(currentValues => ({
  //     ...currentValues,
  //     [event.target.name]: event.target.value
  //   }))
  // }

  // function handleSubmit(event) {
  //   event.preventDefault();

  //   logInUser(formValues)
  //     .then(response => {
  //       dispatch({ type: "setLoggedInUser", data: response.email })
  //       dispatch({ type: "setIdToken", idToken: response.idToken  })
  //       navigate("/")
  //     })
  //     .catch(error => {
  //       const message = parseError(error)
  //       setErrorMessage(message);
  //     })
  // }

  return(
    <div>singup</div>
    // <form onSubmit={handleSubmit}>
    //   {errorMessage && <p>{errorMessage}</p>}
    //   <h2>Sign Up</h2>
    //   <Block>
    //     <Label>Email:</Label>
    //     <Input onChange={handleChange} type="email" name="email" placeholder="Enter your email" value={formValues.email} />
    //   </Block>
    //   <Block>
    //     <Label>Username:</Label>
    //     <Input onChange={handleChange} type="text" name="username" placeholder="Enter your username" value={formValues.username} />
    //   </Block>
    //   <Block>
    //     <Label>Password:</Label>
    //     <Input onChange={handleChange} type="password" name="password" placeholder="Enter your password" value={formValues.password} />
    //   </Block>
    //   <Block>
    //     <Label>Password confirmation:</Label>
    //     <Input onChange={handleChange} type="password" name="password_confirmation" placeholder="Confirm your password" value={formValues.password_confirmation} />
    //   </Block>
    //   <Block>
    //     <InputButton type="submit" value="Sign Up" />
    //   </Block>
    // </form>
  )
}