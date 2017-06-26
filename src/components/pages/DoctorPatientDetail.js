import keyBy              from 'lodash/keyBy'
import {connect}          from 'react-redux'
import PatientDetail      from '../common/PatientDetail'
import {getPatientDetail} from '../../actions/patients'
import React, {Component} from 'react'

class DoctorPatientDetail extends Component {

  componentDidMount() {
    this.props.dispatch(getPatientDetail(this.props.match.params.id))
  }

  render() {
    const { props: { session, patient, doctorsById, appointments }} = this

    const dataReady = !!(patient)

    return (
      <div>
        {dataReady
          ? <PatientDetail
              session             = {session}
              patient             = {patient}
              doctorsById         = {doctorsById}
              appointments        = {appointments}
              onAppointmentUpdate = {this.handleAppointmentUpdate}
            />
          : <div className="App-loading" />
        }
      </div>
    )
  }

}

export default connect(
  (state) => ({
    session      : state.session,
    patient      : state.patients.detailResult,
    doctorsById  : keyBy(state.doctors.all, d => d.id),
    appointments : state.patients.detailAppointments,
  })
)(DoctorPatientDetail)
