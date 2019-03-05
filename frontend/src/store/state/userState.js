const userState = {
  name: '',
  email: '',
  token: localStorage.getItem('token') || '',
  isLoggedIn: false,
  authenticationStatus: {
    isLoggingIn: false,
    errors: [],
  },
}


export default userState;