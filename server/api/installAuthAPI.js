const queries     = require('../queries')
const handleError = require('../utils/handleError')


module.exports = function (db, app) {

  function fetchSessionData(db, sessionKey, next) {
    queries.matchUserSession(db, { sessionKey }, (err, user) => {
      if (err) return next(err)

      if (user) {
        queries.getDoctors(db, (err, doctors) => {
          if (err) return next(err)
          next(null, { user, doctors })
        })
      } else {
        next(null, { user: null })
      }
    })
  }

  app.get('/auth-api/session', (req, res) => {
    const sessionKey = req.cookies['session-id']

    if (sessionKey) {
      fetchSessionData(db, sessionKey, (err, sessionData) => {
        if (err) return handleError(res, err)
        res.send(sessionData)
      })
    } else {
      res.send({ user: null })
    }
  })

  app.post('/auth-api/session', (req, res) => {
    queries.matchUserCreds(db, req.body, (err, userId) => {
      if (err) return handleError(res, err)

      if (userId) {
        queries.createSession(db, { userId }, (err, sessionKey) => {
          if (err) return handleError(res, err)
          res.cookie('session-id', sessionKey, { httpOnly: true })

          if (sessionKey) {
            fetchSessionData(db, sessionKey, (err, sessionData) => {
              if (err) return handleError(res, err)
              res.send(sessionData)
            })
          } else {
            res.send({ user: null })
          }

        })
      } else {
        res.status(401).send('Not Authorized')
      }
    })
  })

  app.delete('/auth-api/session', (req, res) => {
    const sessionKey = req.cookies['session-id']

    if (sessionKey) {
      queries.expireSession(db, { sessionKey }, (err, user) => {
        if (err) return handleError(res, err)
        res.send({ user: null })
      })
    } else {
      res.send({ user: null })
    }
  })

}
