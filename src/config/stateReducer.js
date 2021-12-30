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
        loggedInUser: null,
        tickets: []
      }
    }

    case "setIdToken": {
      sessionStorage.setItem('idToken', action.idToken)

      return{
        ...state,
        idToken: action.idToken
      }
    }

    case "removeIdToken": {
      sessionStorage.removeItem('idToken')
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