import React, { Component } from 'react'
import Activities from './Activities'
import LoginScreen from '../screens/Login'
import FeedbackScreen from '../screens/Feedback'
import NavBar from './NavBar'
import '../styles/App.scss'
import { Route, Switch, withRouter } from 'react-router-dom'
import * as Routes from "./NavBar/routes";
import AdminPage from '../screens/Admin/Admin';
import { CreateParticipantGqlWrapper } from '../screens/CreateParticipant/CreateParticipantGqlWrapper';
import ViewParticipants from '../screens/ViewParticipants'
class App extends Component {
  render() {
    return (
      <main>
        <NavBar />
        <div className="content">
          <Switch>
            <Route exact path={Routes.HOME} component={LoginScreen} />
            <Route exact path={Routes.LOGIN} component={LoginScreen} />
            <Route exact path={Routes.ACTIVITIES} component={Activities} />
            <Route exact path={Routes.FEEDBACK} component={FeedbackScreen} />
            <Route exact path = {Routes.ADMIN} component = {AdminPage}/>
            <Route exact path = {Routes.CREATE_PARTICIPANT} component = {CreateParticipantGqlWrapper}/>
            <Route exact path = {Routes.VIEW_PARTICIPANTS} component = {ViewParticipants}/>
          </Switch>
        </div>
      </main>
    )
  }
}

export default withRouter(App)
