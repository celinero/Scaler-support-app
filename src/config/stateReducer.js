import initialState from "config/initialState";

const stateReducer = (state, action) => {
  switch (action.type) {
    case "tickets:set": {
      return {
        ...state,
        tickets: action.data,
      };
    }

    case "categories:set": {
      return {
        ...state,
        categories: action.data,
      };
    }

    case "user:login": {
      const { idToken, displayName, email, uid, role } = action.data;

      sessionStorage.setItem("idToken", idToken);

      return {
        ...state,
        user: {
          displayName,
          email,
          uid,
          role,
          isLoggedIn: true,
        },
      };
    }

    case "user:logout": {
      sessionStorage.removeItem("idToken");

      return {
        ...initialState,
        categories: state.categories,
      };
    }

    default:
      return state;
  }
};

export default stateReducer;
