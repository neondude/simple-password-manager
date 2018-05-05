const userDefaultState = {
  username: undefined,
  password: undefined,
  logged_in: false
}
const user = (state = userDefaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        username: action.username,
        password: action.password,
        logged_in: true
      }
    default:
      return state
  }
}
export default user