const queries     = require('../queries')
const handleError = require('../utils/handleError')

module.exports = function (db, app) {

  app.use('/shared-api/*', (req, res, next) => {
    const sessionKey = req.cookies['session-id']

    if (sessionKey) {
      queries.matchUserSession(db, { sessionKey }, (err, user) => {
        if (err) return handleError(res, err)
        if (user) {
          res.locals.user = user
          next()
        } else {
          res.status(401).send('Not Authorized for Doctor API')
        }
      })
    } else {
      res.status(401).send('Not Authorized')
    }

  })

  app.post('/shared-api/patients/:patientId/appointment', (req, res) => {
    const patientId = req.params.patientId

    queries.createAppointment(db, req.body, (err) => {
      if (err) return handleError(res, err)

      queries.getPatientAppointments(db, { patientId }, (err, appointments) => {
        if (err) return handleError(res, err)

        res.send({ appointments })
      })
    })
  })

  app.post('/shared-api/patients/:patientId/appointment/:appointmentId/approve', (req, res) => {
    queries.approveAppointment(db, req.params, (err) => {
      if (err) return handleError(res, err)

      queries.getPatientAppointments(db, req.params, (err, appointments) => {
        if (err) return handleError(res, err)

        res.send({ appointments })
      })
    })
  })

  app.post('/shared-api/patients/:patientId/appointment/:appointmentId/cancel', (req, res) => {
    queries.cancelAppointment(db, Object.assign({}, req.params, req.body), (err) => {
      if (err) return handleError(res, err)

      queries.getPatientAppointments(db, req.params, (err, appointments) => {
        if (err) return handleError(res, err)

        res.send({ appointments })
      })
    })
  })

}
