import {NavLink}          from 'react-router-dom'
import PropTypes          from 'prop-types'
import React, {Component} from 'react'

export default class TopNav extends Component {

  static propTypes = {
    session  : PropTypes.object.isRequired,
    onLogout : PropTypes.func.isRequired,
  }

  render() {
    const { props: { session, onLogout }} = this

    return (
      <div className="TopNav-wrap">
        <div className="TopNav">
          <div className="TopNav-brand">Health Portal</div>
          <div className="TopNav-linksLeft">
            {session.isDoctor &&
              <NavLink exact to="/" className="TopNav-link" activeClassName="active">Patient Search</NavLink>
            }
          </div>
          <div className="TopNav-linksRight">
            {session.isDoctor &&
              <div className="TopNav-username">{session.user.email} (Doctor)</div>
            }
            {session.isPatient &&
              <div className="TopNav-username">{session.user.email} (Patient)</div>
            }
            {session.user &&
              <div className="TopNav-link TopNav-logout" onClick={onLogout}>Logout</div>
            }
          </div>
        </div>
      </div>
    )
  }

}
