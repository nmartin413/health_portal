import get                        from 'lodash/get'
import find                       from 'lodash/find'
import Button                     from './Button'
import moment                     from 'moment'
import {connect}                  from 'react-redux'
import PropTypes                  from 'prop-types'
import LabeledInput               from './LabeledInput'
import React, {Component}         from 'react'
import {createPatientAppointment} from '../../actions/patients'

class CreateAppointment extends Component {

  static propTypes = {
    session : PropTypes.object.isRequired,
    doctors : PropTypes.array.isRequired,
  }

  constructor(props, context) {
    super(props, context)
    this.state = { purpose: '', appointmentDate: '', doctorId: '' }
  }

  handleSubmit = (evt) => {
    evt.preventDefault()

    const appointmentDate   = moment(this.state.appointmentDate).toISOString()
    const defaultedDoctorId = getDefaultedDoctorId(this.props, this.state)

    this.props.dispatch(createPatientAppointment({
      purpose         : this.state.purpose,
      doctorId        : defaultedDoctorId,
      patientId       : this.props.patient.id,
      appointmentDate : appointmentDate,
    }))
    .then(() => this.setState({ purpose: '', appointmentDate: '', doctorId: '' }))
  }

  preventSubmit = (evt) => {
    evt.preventDefault()
    window.alert('Some fields are missing or incomplete')
  }

  render() {
    const {
      props: { session, doctors },
      state: { purpose, appointmentDate, doctorId }
    } = this

    const defaultedDoctorId = getDefaultedDoctorId(this.props, this.state)
    const canSubmit         = (purpose && doctorId && moment(appointmentDate).isValid())
    const handleSubmit      = canSubmit ? this.handleSubmit : this.preventSubmit

    return (
      <form className="Box" onSubmit={handleSubmit}>
        <div className="Box-title">Create Appointment</div>
        <div className="Form-control">
          <LabeledInput
            label       = "Purpose for visit"
            value       = {purpose}
            onChange    = {(evt) => this.setState({ purpose: evt.target.value })}
            placeholder = "ex : Checkup, lab results review"
          />
        </div>
        <div className="Form-control">
          <LabeledInput
            type     = "datetime-local"
            label    = "Date"
            value    = {appointmentDate}
            onChange = {(evt) => this.setState({ appointmentDate: evt.target.value })}
          />
        </div>
        <div className="Form-control">
          <div className="Form-label">Doctor</div>
          <select
            value     = {defaultedDoctorId || ''}
            onChange  = {(evt) => this.setState({ doctorId: evt.target.value })}
            className = "Form-select"
          >
            <option disabled value=''>--</option>
            {doctors && doctors.map((doctor) => {
              const isCurrentUser = (doctor.id === session.user.id)
              return (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.last_name}, {doctor.first_name}
                  {isCurrentUser ? ' (You)' : ''}
                </option>
              )
            })}
          </select>
        </div>
        <div className="Form-control right">
          <Button disabled={!canSubmit} displayType="primary" type="submit" label="Create" />
        </div>
      </form>
    )
  }

}

function getDefaultedDoctorId({ session, doctors }, { doctorId }) {
  const sessionDoctor = find(doctors, d => d.user_id === session.user.own_doctor_id)
  return doctorId || get(sessionDoctor, 'id')
}

export default connect(
  (state) => ({
    doctors : state.doctors.all
  })
)(CreateAppointment)
