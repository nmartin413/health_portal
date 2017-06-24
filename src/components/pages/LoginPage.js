import './LoginPage.css'

import cx                 from 'classnames'
import Button             from '../common/Button'
import {connect}          from 'react-redux'
import PropTypes          from 'prop-types'
import Constants          from '../../Constants'
import LabeledInput       from '../common/LabeledInput'
import {createSession}    from '../../actions/user'
import React, {Component} from 'react'

class LoginPage extends Component {

  static propTypes = {
    user     : PropTypes.object.isRequired,
    dispatch : PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context)
    this.state = { email: '', password: '', userType: Constants.patientUserGroup }
  }

  handleLogin = (evt) => {
    evt.preventDefault()
    this.props.dispatch(createSession({
      email    : this.state.email,
      userType : this.state.userType,
      password : this.state.password,
    }))
  }

  renderTypeOption = (label, userGroup) => {
    const { state: { userType }} = this

    const active      = (userType === userGroup)
    const className   = cx('LoginPage-userTypeOption', { active })
    const handleClick = () => this.setState({ userType: userGroup })

    return (
      <div className={className} onClick={handleClick}>{label}</div>
    )
  }

  render() {
    const { state: { email, password }} = this

    return (
      <div className="LoginPage">
        <div className="LoginPage-prompt">
          <div className="LoginPage-graphic" />
          <div className="LoginPage-userTypes">
            {this.renderTypeOption('Patient Login', Constants.patientUserGroup)}
            {this.renderTypeOption('Doctor Login', Constants.doctorUserGroup)}
          </div>
          <form className="LoginPage-form" onSubmit={this.handleLogin}>
            <div className="LoginPage-formControl">
              <LabeledInput
                type        = "text"
                label       = "email"
                value       = {email}
                onChange    = {(evt) => this.setState({ email: evt.target.value })}
                placeholder = "you@example.com"
              />
            </div>
            <div className="LoginPage-formControl">
              <LabeledInput
                type        = "password"
                label       = "password"
                value       = {password}
                onChange    = {(evt) => this.setState({ password: evt.target.value })}
                placeholder = ""
              />
            </div>
            <div className="LoginPage-formControl right">
              <Button primary type="submit" label="Login" />
            </div>
          </form>
        </div>
      </div>
    )
  }

}

export default connect(
  (state) => ({
    user: state.user
  })
)(LoginPage)
