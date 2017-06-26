const path         = require('path')
const express      = require('express')
const bodyParser   = require('body-parser')
const cookieParser = require('cookie-parser')

module.exports = function (db, next) {
  const app = express()

  app.use(bodyParser.json())
  app.use(cookieParser())

  app.use('/static', express.static(path.join(__dirname, '..', 'static')))

  require('./api/installAuthAPI')(db, app)
  require('./api/installDoctorAPI')(db, app)
  require('./api/installSharedAPI')(db, app)
  require('./api/installPatientAPI')(db, app)

  app.listen(3001, () => next(app))
}
