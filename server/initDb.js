const pg = require('pg')

const DEFAULT_CONFIG = {
  database : 'health_portal',
  password : 'health_portal_user',
  user     : 'health_portal_user',
}

const TEST_CONFIG = {
  database : 'health_portal_test',
  password : 'health_portal_test_user',
  user     : 'health_portal_test_user',
}

module.exports = function (next) {
  const config = (process.env.NODE_ENV === 'test' ? TEST_CONFIG : DEFAULT_CONFIG)
  const db     = new pg.Client(config)

  db.connect((err) => {
    if (err) {
      console.log('Error during db init')
      console.log(err)
      process.exit(1)
    } else {
      next(db)
    }
  })
}
