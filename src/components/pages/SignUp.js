import React, { useState }  from 'react';
import { useGlobalState } from 'config/store';
import { signUpUser } from 'services/userServices';
import { Block, Label, Input } from 'components/atoms';

export const SignUp = (props) => {
  const [formValues, setFormValues] = useState({ email: "", displayName: "", password: "" });
  const { store: { user }, dispatch } = useGlobalState();

  function handleChange(event) {
    setFormValues(currentValues => ({
      ...currentValues,
      [event.target.name]: event.target.value
    }))
  }

  function handleSubmit(event) {
    event.preventDefault();

    dispatch({ type: "user:fetch" })

    signUpUser(formValues)
      .then(response => {
        dispatch({ type: "user:login", data: {
          displayName: response.displayName,
          email: response.email,
          uid: response.uid,
          idToken: response.idToken
        }})
      })
      .catch(error => {
        dispatch({ type: "user:error" })
        console.log(error)
      })
  }

  console.log(user)

  return(
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <Block>
        <Label>Email:</Label>
        <Input onChange={handleChange} type="email" name="email" placeholder="Enter your email" value={formValues.email} />
      </Block>
      <Block>
        <Label>Username:</Label>
        <Input onChange={handleChange} type="text" name="displayName" placeholder="Enter your username" value={formValues.displayName} />
      </Block>
      <Block>
        <Label>Password:</Label>
        <Input onChange={handleChange} type="password" name="password" placeholder="Enter your password" value={formValues.password} />
      </Block>
      <Block>
        <button type="submit" disabled={user.loading}>Sign Up</button>
      </Block>
    </form>
  )
}