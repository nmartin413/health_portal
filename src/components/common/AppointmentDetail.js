import get                from 'lodash/get'
import moment             from 'moment'
import Button             from './Button'
import {connect}          from 'react-redux'
import PropTypes          from 'prop-types'
import React, {Component} from 'react'

import {
  approveAppointment,
  cancelAppointment
} from '../../actions/patients'

class AppointmentDetail extends Component {

  static propTypes = {
    appointment : PropTypes.object.isRequired,
    session     : PropTypes.object.isRequired,
    doctor      : PropTypes.object.isRequired,
  }

  handleApprove = () => {
    const { props: { dispatch, appointment }} = this

    if (!window.confirm('Approve this appointment?')) return
    dispatch(approveAppointment({
      appointmentId : appointment.id,
      patientId     : appointment.patient_id,
    }))
  }

  handleCancel = () => {
    const { props: { dispatch, appointment }} = this

    const cancelReason = window.prompt('Cancelation Reason:')

    if (cancelReason) {
      dispatch(cancelAppointment({
        appointmentId : appointment.id,
        cancelReason  : cancelReason,
        patientId     : appointment.patient_id,
      }))
    }
  }

  render() {
    const { props: { appointment, session, doctor }} = this

    const isApproved = !!(appointment.approved_at)
    const isCanceled = !!(appointment.canceled_at)
    const isPast     = moment().isAfter(moment(appointment.appointment_at))

    const canApprove = (session.user.own_doctor_id === appointment.doctor_id)
    const canCancel  =
      (session.user.own_doctor_id  === appointment.doctor_id) ||
      (session.user.own_patient_id === appointment.patient_id)

    return (
      <div className="Box" key={appointment.id}>
        <div className="Box-title">
          Dr. {get(doctor, 'first_name')} {get(doctor, 'last_name')}
        </div>
        {isCanceled && (<div className="Box-flag red">Canceled</div>)}
        {!isCanceled && isPast      && (<div className="Box-flag">Past</div>)}
        {!isCanceled && isApproved  && (<div className="Box-flag green">Approved</div>)}
        {!isCanceled && !isApproved && !isPast && (<div className="Box-flag yellow">Pending</div>)}
        <div className="Field">
          <div className="Field-label">Purpose</div>
          <div className="Field-value">{appointment.purpose}</div>
        </div>
        <div className="Field">
          <div className="Field-label">Date</div>
          <div className="Field-value">{moment(appointment.appointment_at).format('llll')}</div>
        </div>
        {isCanceled &&
          <div className="Field">
            <div className="Field-label">Cancel Reason</div>
            <div className="Field-value">{appointment.cancel_reason}</div>
          </div>
        }
        <div className="Field">
          <div className="Field-label">Approved At</div>
          <div className="Field-value">
            {appointment.approved_at
              ? moment(appointment.approved_at).format('llll')
              : '(not approved)'
            }
          </div>
        </div>

        <div className="Form">
          <div className="Form-control right">
            {canApprove && !isPast && !isApproved && !isCanceled && <Button onClick={this.handleApprove} label="Approve" />}
            {canCancel  && !isPast && !isCanceled && <Button onClick={this.handleCancel} displayType="danger" label="Cancel" />}
          </div>

        </div>
      </div>
    )
  }

}

export default connect(
  (state) => ({
    session: state.session
  })
)(AppointmentDetail)
