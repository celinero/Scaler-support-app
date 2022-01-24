import initialState from 'config/initialState'

const stateReducer = (state, action) => {
  switch(action.type){
    case "tickets:fetch": {
      return {
        ...state, 
        tickets: {
          ...state.tickets,
          loading: true,
          error: false
        }
      }
    }

    case "tickets:error": {
      return {
        ...state, 
        tickets: {
          data: [],
          loading: false,
          error: true,
          completed: true
        }
      }
    }

    case "tickets:set": {
      return {
        ...state, 
        tickets: {
          data: action.data,
          loading: false,
          error: false,
          completed: true
        }
      }
    }

    case "categories:fetch": {
      return {
        ...state, 
        categories: {
          data: [],
          loading: true,
          error: false
        }
      }
    }

    case "categories:error": {
      return {
        ...state, 
        categories: {
          data: [],
          loading: false,
          error: true
        }
      }
    }

    case "categories:set": {
      return {
        ...state, 
        categories: {
          data: action.data,
          loading: false,
          error: false
        }
      }
    }

    case "user:fetch": {
      return {
        ...state, 
        user: {
          ...state.user,
          loading: true,
          error: false
        }
      }
    }

    case "user:error": {
      return {
        ...state, 
        user: {
          ...state.user,
          loading: false,
          error: true
        }
      }
    }

    case "user:login": {
      sessionStorage.setItem('idToken', action.data.idToken);

      return {
        ...state, 
        user: {
          data: {
            displayName: action.data.displayName,
            email: action.data.email,
            uid: action.data.uid,
            role: action.data.role,
            isLoggedIn: true,
          },
          loading: false,
          error: false
        }
      }
    }

    case "user:logout": {
      sessionStorage.removeItem('idToken');

      return {
        ...initialState,
        categories: {
          ...state.categories, 
        }
      }
    }

    default:
      return state;
  }
}

export default stateReducer;