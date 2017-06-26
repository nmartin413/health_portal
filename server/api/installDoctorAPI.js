const queries     = require('../queries')
const handleError = require('../utils/handleError')

module.exports = function (db, app) {

  app.use('/doctor-api/*', (req, res, next) => {
    const sessionKey = req.cookies['session-id']

    if (sessionKey) {
      queries.matchUserSession(db, { sessionKey }, (err, user) => {
        if (err) return handleError(res, err)
        if (user && user.type === 'doctor-user') {
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

  app.get('/doctor-api/patients', (req, res) => {
    const page   = req.query.page   || 0
    const limit  = req.query.limit  || 10
    const search = req.query.search || ''

    queries.getPatientList(db, { page, limit, search }, (err, patients) => {
      if (err) return handleError(res, err)

      res.send({ patients })
    })
  })

  app.get('/doctor-api/patients/:id', (req, res) => {
    const patientId = req.params.id

    queries.getPatientData(db, { patientId }, (err, patient) => {
      if (err) return handleError(res, err)

      queries.getPatientAppointments(db, { patientId }, (err, appointments) => {
        if (err) return handleError(res, err)

        res.send({ patient, appointments })
      })
    })
  })

}
