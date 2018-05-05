export const doLogin = (username, password) => {
  console.log({ type: 'LOGIN', username, password })
  return {
    type: 'LOGIN',
    username,
    password,
  }
}
