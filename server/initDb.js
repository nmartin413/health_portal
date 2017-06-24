const pg = require('pg')

module.exports = function (next) {
  const db = new pg.Client({ database: 'postgres' })
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
