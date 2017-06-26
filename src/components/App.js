import '../index.css'

import TopNav              from './chrome/TopNav'
import {connect}           from 'react-redux'
import LoginPage           from './pages/LoginPage'
import PropTypes           from 'prop-types'
import PatientList         from './pages/PatientList'
import PatientHome         from './pages/PatientHome'
import React, {Component}  from 'react'
import DoctorPatientDetail from './pages/DoctorPatientDetail'

import {
  BrowserRouter,
  Route,
  Redirect
} from 'react-router-dom'

import {
  getSession,
  destroySession
} from '../actions/session'

class App extends Component {

  static propTypes = {
    session : PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.dispatch(getSession())
  }

  handleLogout = () => {
    this.props.dispatch(destroySession())
  }

  render() {
    const { props: { session }} = this

    const isPending = (session.pending)
    const hasAuth   = (session.user !== null)

    return (
      <BrowserRouter>
        <div className="App-wrap">
          <div className="App">
            <div className="App-navWrap">
              <div className="App-nav">
                <TopNav session={session} onLogout={this.handleLogout} />
              </div>
            </div>
            <div className="App-contentWrap">
              <div className="App-content">
                {isPending  && <div className="App-loading" />}
                {!isPending && !hasAuth  && <Route exact path="*" component={LoginPage} />}

                {!isPending && session.isDoctor  && <Route exact path="/" component={PatientList} />}
                {!isPending && session.isDoctor  && <Route exact path="/patients/:id" component={DoctorPatientDetail} />}

                {!isPending && session.isPatient && <Route exact path="/" component={PatientHome} />}
                {!isPending && session.isPatient &&
                  <Route exact path="/patients/:id" children={() => (<Redirect to="/" />)} />
                }
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
    session: state.session
  })
)(App)
