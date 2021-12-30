const stateReducer = (state, action) => {
  switch(action.type){
    case "setTickets": {
      return {
        ...state, 
        tickets: action.data
      }
    }

    case "setCategories": {
      return{
        ...state,
        categories: action.data
      }
    }

    case "setLoggedInUser": {
      return{
        ...state,
        loggedInUser: action.data
      }
    }

    case "removeLoggedInUser": {
      return{
        ...state,
        loggedInUser: null
      }
    }

    case "setIdToken": {
      sessionStorage.setItem('idToken', action.idToken)
      sessionStorage.setItem('refreshToken', action.refreshToken)

      return{
        ...state,
        idToken: action.idToken
      }
    }

    case "removeIdToken": {
      sessionStorage.removeItem('idToken')
      sessionStorage.removeItem('refreshToken')
      return{
        ...state,
        idToken: null
      }
    }

    default:
      return state;
  }
}

export default stateReducer;