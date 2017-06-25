
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

    INSERT INTO users (id, type, email, password, created_at, updated_at) values (
      2,
      'patient-user',
      'patient@patient.com',
      'patient',
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

    INSERT INTO patients (id, age, user_id, last_name, first_name, created_at, updated_at, middle_name, phone_number, address_line_1, address_line_2) values
      (1, 27, 1, 'Pavil', 'Patsy', now(), now(), 'P', '+1-123-456-7890', '123 Pumpkin Place', 'Platz 1')
      ON CONFLICT (id) DO NOTHING;

    INSERT INTO patients (id, age, user_id, last_name, first_name, created_at, updated_at, middle_name, phone_number, address_line_1, address_line_2) values
      (2, 28, NULL, 'West', 'Ruth', now(), now(), '', '', '', '')
      ON CONFLICT (id) DO NOTHING;

    INSERT INTO patients (id, age, user_id, last_name, first_name, created_at, updated_at, middle_name, phone_number, address_line_1, address_line_2) values
      (3, 42, NULL, 'Anderson', 'Lois', now(), now(), '', '', '', '')
      ON CONFLICT (id) DO NOTHING;

    INSERT INTO patients (id, age, user_id, last_name, first_name, created_at, updated_at, middle_name, phone_number, address_line_1, address_line_2) values
      (4, 35, NULL, 'Fisher', 'Brandon', now(), now(), '', '', '', '')
      ON CONFLICT (id) DO NOTHING;

    INSERT INTO patients (id, age, user_id, last_name, first_name, created_at, updated_at, middle_name, phone_number, address_line_1, address_line_2) values
      (5, 65, NULL, 'McCarthy', 'Grace', now(), now(), '', '', '', '')
      ON CONFLICT (id) DO NOTHING;

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
