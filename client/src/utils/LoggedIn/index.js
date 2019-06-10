const loggedIn = () => {
  return localStorage.getItem('token') != null && localStorage.getItem('token') !== ""
}

export default loggedIn