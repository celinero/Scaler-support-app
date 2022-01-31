const initialState = {
  tickets: {
    data: [],
    loading: true,
    error: false,
  },
  categories: {
    data: [],
    loading: true,
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
