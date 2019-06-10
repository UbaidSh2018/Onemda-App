import React from 'react'
import * as Routes from "./routes";
import { NavLink } from './NavLink';
import './styles.scss'
import { getUserRoles } from '../../utils/TokenDecoder'
import loggedIn from '../../utils/LoggedIn'


import { withApollo } from 'react-apollo'


class NavBar extends React.Component {
  
  render() {
    const logout = (client) => {
        client.resetStore()
        client.writeData({ data: { isLoggedIn: false } })
        localStorage.removeItem("token")
        window.location.reload();
    }

    const token = localStorage.getItem('token')
    const roles = getUserRoles(token ? token : "")
    const actualRole = roles ? roles : ""
    const isAdmin = actualRole.includes('admin')
    const isTrainer = actualRole.includes('trainer')
  

  
    const { client } = this.props

    return (

      <div className="navbar">
        <div>
          <NavLink to = {Routes.ACTIVITIES} label = "Activities"/>
          {isTrainer && <NavLink to = {Routes.FEEDBACK} label = "Feedback"/>}
          {isAdmin && <NavLink to = {Routes.ADMIN} label = "Admin"/>}
        </div>
         {loggedIn() ? <button className="navbar__signout_button" onClick={() => logout(client)}>Sign Out</button> : <NavLink to = {Routes.LOGIN} label='Sign In'/>}
      </div>
    )
  }
}

export default withApollo(NavBar)
