const initialState = {
  tickets: {
    data: [],
    loading: false,
    error: false,
    initialise: false
  },
  categories: {
    data: [],
    loading: false,
    error: false
  },
  user: {
    data: {
      displayName: '',
      email: '',
      uid: '',
      isLoggedIn: false
    },
    loading: false,
    error: false
  },
}

export default initialState;