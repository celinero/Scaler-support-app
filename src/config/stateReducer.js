const stateReducer = (state, action) => {
  switch(action.type){
    case "setTickets": {
      return {
        ...state, 
        tickets: action.data
      }
    }
    default:
      return state;
  }
}

export default stateReducer;