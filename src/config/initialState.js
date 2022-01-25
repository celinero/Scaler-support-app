const initialState = {
  tickets: {
    data: [],
    loading: false,
    error: false,
    completed: false,
  },
  categories: {
    data: [],
    loading: false,
    error: false,
  },
  user: {
    data: {
      displayName: "",
      email: "",
      uid: "",
      role: "",
      isLoggedIn: false,
    },
    loading: false,
    error: false,
  },
};

export default initialState;
