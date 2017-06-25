const path         = require('path')
const queries      = require('./queries')
const express      = require('express')
const bodyParser   = require('body-parser')
const cookieParser = require('cookie-parser')

module.exports = function (db, next) {
  const app = express()

  app.use(bodyParser.json())
  app.use(cookieParser())

  app.use('/static', express.static(path.join(__dirname, '..', 'static')))

  app.get('/api/session', (req, res) => {
    const sessionKey = req.cookies['session-id']

    if (sessionKey) {
      queries.matchUserSession(db, { sessionKey }, (err, user) => {
        if (err) return handleError(res, err)
        res.send({ user: (user || null) })
      })
    } else {
      res.send({ user: null })
    }
  })

  app.post('/api/session', (req, res) => {
    queries.matchUserCreds(db, req.body, (err, user) => {
      if (err) return handleError(res, err)

      if (user && user.id) {
        queries.createSession(db, { userId: user.id }, (err, sessionKey) => {
          if (err) return handleError(res, err)
          res.cookie('session-id', sessionKey, { httpOnly: true })
          res.send({ user })
        })
      } else {
        res.send({ user: null })
      }
    })
  })

  app.get('/api/patients', (req, res) => {
    queries.getPatientList(db, req.query, (err, patients) => {
      if (err) return handleError(res, err)

      res.send({ patients })
    })
  })

  app.listen(3001, () => next(app))
}

function handleError(res, err) {
  console.error(err)

  res.status(500)
  res.send({ message: "an error has occurred" })
}
