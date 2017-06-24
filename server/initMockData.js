
module.exports = function (db, next) {
  db.query(`
    INSERT INTO users (id, type, email, password, created_at, updated_at) values (
      1,
      'doctor-user',
      'doctor@doctor.com',
      'doctor',
      now(),
      now()
    ) ON CONFLICT (id) DO NOTHING;

    INSERT INTO doctors (id, user_id, created_at, updated_at, last_name, first_name, middle_name) values (
      1,
      1,
      now(),
      now(),
      'Dietrich',
      'Daniel',
      'D'
    ) ON CONFLICT (id) DO NOTHING;

  `, (err) => {
    if (err !== null) {
      console.log('Error during mock data setup')
      console.log(err)
      process.exit(1)
    } else {
      next()
    }
  })
}
