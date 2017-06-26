const queries     = require('../queries')
const handleError = require('../utils/handleError')

module.exports = function (db, app) {

  app.use('/patient-api/*', (req, res, next) => {
    const sessionKey = req.cookies['session-id']

    if (sessionKey) {
      queries.matchUserSession(db, { sessionKey }, (err, user) => {
        if (err) return handleError(res, err)
        if (user && user.type === 'patient-user') {
          res.locals.user = user
          next()
        } else {
          res.status(401).send('Not Authorized for Patient API')
        }
      })
    } else {
      res.status(401).send('Not Authorized')
    }

  })

  app.get('/patient-api/patients/me', (req, res) => {
    const sessionKey = req.cookies['session-id']

    queries.getPatientDataForSession(db, { sessionKey }, (err, patient) => {
      if (err) return handleError(res, err)

      queries.getPatientAppointments(db, { patientId: patient.id }, (err, appointments) => {
        if (err) return handleError(res, err)

        res.send({ patient, appointments })
      })
    })
  })

}
