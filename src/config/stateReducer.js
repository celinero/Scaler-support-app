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

    default:
      return state;
  }
}

export default stateReducer;