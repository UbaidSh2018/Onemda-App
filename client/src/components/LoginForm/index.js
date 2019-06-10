import React, { Component } from 'react'
import './styles.scss'

class LoginForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  submitForm = (e) => {
    e.preventDefault()
    this.props.onLogin({variables: {username: this.state.username, password: this.state.password} })
  }

  onChangeUsername = (e) => {
    this.setState({username: e.target.value})
  }

  onChangePassword = (e) => {
    this.setState({password: e.target.value})
  }

  render() {
    return (
        <form className="login__form" onSubmit={(e) => this.submitForm(e)}>
          <h3>Login</h3>
          <div>
            <label for="username">Username</label>
            <input id="username" type="text" onChange={(e) => this.onChangeUsername(e)}/>
          </div>
          <div>
            <label for="password">Password</label>
            <input id="password" type="password" onChange={(e) => this.onChangePassword(e)}/>
          </div>
          <button className="login__submit_button">Submit</button>
        </form>
    )
  }
}

export default LoginForm
