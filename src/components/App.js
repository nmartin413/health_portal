import './App.css'

import TopNav                   from './chrome/TopNav'
import Constants                from '../Constants'
import {connect}                from 'react-redux'
import LoginPage                from './pages/LoginPage'
import PropTypes                from 'prop-types'
import DoctorHome               from './pages/DoctorHome'
import PatientHome              from './pages/PatientHome'
import {getSession}             from '../actions/user'
import React, { Component }     from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

class App extends Component {

  static propTypes = {
    user : PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.dispatch(getSession())
  }

  render() {
    const { props: { user }} = this

    const isPending = (user.pending)
    const hasAuth   = (user.id !== null)
    const isDoctor  = !!(hasAuth && (user.type === Constants.doctorUserGroup))
    const isPatient = !!(hasAuth && (user.type === Constants.patientUserGroup))

    console.log({ isDoctor, isPatient })

    return (
      <BrowserRouter>
        <div className="App-wrap">
          <div className="App">
            <div className="App-navWrap">
              <div className="App-nav">
                <TopNav />
              </div>
            </div>
            <div className="App-contentWrap">
              <div className="App-content">
                {user.pending && <div className="App-loading" />}
                {!user.pending && !hasAuth  && <Route exact path="/" component={LoginPage} />}
                {!user.pending && isDoctor  && <Route exact path="/" component={DoctorHome} />}
                {!user.pending && isPatient && <Route exact path="/" component={PatientHome} />}
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    )
  }

}

export default connect(
  (state) => ({
    user: state.user
  })
)(App)
