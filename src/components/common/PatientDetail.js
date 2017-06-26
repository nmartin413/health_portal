import get                from 'lodash/get'
import sortBy             from 'lodash/sortBy'
import moment             from 'moment'
import PropTypes          from 'prop-types'
import partition          from 'lodash/partition'
import AppointmentDetail  from '../common/AppointmentDetail'
import CreateAppointment  from '../common/CreateAppointment'
import React, {Component} from 'react'

export default class PatientDetail extends Component {

  static propTypes = {
    session      : PropTypes.object.isRequired,
    patient      : PropTypes.object.isRequired,
    doctorsById  : PropTypes.object.isRequired,
    appointments : PropTypes.array.isRequired,
  }

  renderAppointment = (appointment) => {
    const doctor = get(this.props, ['doctorsById', appointment.doctor_id])

    return (
      <AppointmentDetail
        key         = {appointment.id}
        doctor      = {doctor}
        appointment = {appointment}
      />
    )
  }

  renderFields = (patient) => {
    return (
      <div className="PatientDetail-fields">
        <div className="Field">
          <div className="Field-label">Phone</div>
          <div className="Field-value">{patient.phone_number}</div>
        </div>
        <div className="Field">
          <div className="Field-label">Address</div>
          <div className="Field-value">{patient.address_line_1}</div>
          <div className="Field-value">{patient.address_line_2}</div>
        </div>
        <div className="Field">
          <div className="Field-label">City</div>
          <div className="Field-value">{patient.address_city}</div>
        </div>
        <div className="Field">
          <div className="Field-label">State</div>
          <div className="Field-value">{patient.address_state}</div>
        </div>
        <div className="Field">
          <div className="Field-label">Zip Code</div>
          <div className="Field-value">{patient.address_zip_code}</div>
        </div>
      </div>
    )
  }

  render() {
    const { props: { patient, session, appointments }} = this

    const now = moment()

    const sortedApppointments = sortBy(appointments, a => moment(a.appointment_at).valueOf())

    const [activeAppointments, canceledAppointments] = partition(sortedApppointments, a => !a.canceled_at)
    const [futureAppointments, pastAppointments]     = partition(activeAppointments, a => moment(a.appointment_at).isAfter(now))

    return (
      <div className="PatientDetail">
        <div className="PatientDetail-sidebar">
          <div className="PatientDetail-name">{patient.first_name} {patient.last_name}</div>
          {this.renderFields(patient)}
        </div>
        <div className="PatientDetail-content">
          <div className="PatientDetail-section">
            <CreateAppointment session={session} patient={patient} />
          </div>
          <div className="PatientDetail-section">
            <div className="PatientDetail-sectionTitle">Upcoming Appointments</div>
            {futureAppointments && futureAppointments.map(this.renderAppointment)}
          </div>
          <div className="PatientDetail-section">
            <div className="PatientDetail-sectionTitle">Past Appointments</div>
            {pastAppointments && pastAppointments.map(this.renderAppointment)}
          </div>
          <div className="PatientDetail-section">
            <div className="PatientDetail-sectionTitle">Canceled Appointments</div>
            {canceledAppointments && canceledAppointments.map(this.renderAppointment)}
          </div>
        </div>
      </div>
    )
  }

}
