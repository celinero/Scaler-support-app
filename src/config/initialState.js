const initialState = {
  tickets: {
    data: [],
    loading: false,
    error: false
  },
  categories: {
    data: [],
    loading: false,
    error: false
  },
  user: {
    data: {
      email: '',
      uid: '',
      isLoggedIn: false
    },
    loading: false,
    error: false
  },
}

export default initialState;