
function handleError(err) {
  console.log('Error during schema setup')
  console.log(err)
  process.exit(1)
}

module.exports = function (db, next) {
  db.query(`
    BEGIN;
    CREATE EXTENSION IF NOT EXISTS chkpass;
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    CREATE TABLE IF NOT EXISTS users (
      id          bigserial PRIMARY KEY,
      type        text      NOT NULL,
      email       text      NOT NULL,
      password    chkpass   NOT NULL,
      created_at  timestamp NOT NULL,
      updated_at  timestamp NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id          bigserial PRIMARY KEY,
      key         uuid      NOT NULL,
      user_id     bigint    NOT NULL     REFERENCES users ON DELETE RESTRICT,
      created_at  timestamp NOT NULL,
      updated_at  timestamp NOT NULL
    );

    CREATE TABLE IF NOT EXISTS doctors (
      id             bigserial PRIMARY KEY,
      user_id        bigint                REFERENCES users ON DELETE RESTRICT,
      created_at     timestamp NOT NULL,
      updated_at     timestamp NOT NULL,
      last_name      text      NOT NULL,
      first_name     text      NOT NULL,
      middle_name    text
    );

    CREATE TABLE IF NOT EXISTS patients (
      id             bigserial PRIMARY KEY,
      age            bigint    NOT NULL,
      user_id        bigint                REFERENCES users ON DELETE RESTRICT,
      last_name      text      NOT NULL,
      first_name     text      NOT NULL,
      created_at     timestamp NOT NULL,
      updated_at     timestamp NOT NULL,
      middle_name    text,
      phone_number   text      NOT NULL,
      address_line_1 text      NOT NULL,
      address_line_2 text      NOT NULL
    );

    CREATE TABLE IF NOT EXISTS medical_records (
      id             serial    PRIMARY KEY,
      purpose        text      NOT NULL,
      patient_id     bigint    NOT NULL     REFERENCES patients ON DELETE RESTRICT,
      timestamp      text      NOT NULL,
      created_at     timestamp NOT NULL,
      updated_at     timestamp NOT NULL,
      phone_number   text      NOT NULL,
      address_line_1 text      NOT NULL,
      address_line_2 text      NOT NULL
    );

    CREATE TABLE IF NOT EXISTS appointments (
      id             bigserial PRIMARY KEY,
      purpose        text      NOT NULL,
      doctor_id      bigint    NOT NULL    REFERENCES doctors  ON DELETE RESTRICT,
      patient_id     bigint    NOT NULL    REFERENCES patients ON DELETE RESTRICT,
      created_at     timestamp NOT NULL,
      updated_at     timestamp NOT NULL,
      phone_number   text      NOT NULL,
      appointment_at timestamp NOT NULL,
      address_line_1 text      NOT NULL,
      address_line_2 text      NOT NULL
    );

    CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email                ON users(email);
    CREATE INDEX IF NOT EXISTS        idx_doctors_user_id            ON doctors(user_id);
    CREATE INDEX IF NOT EXISTS        idx_patients_user_id           ON patients(user_id);
    CREATE INDEX IF NOT EXISTS        idx_medical_records_patient_id ON medical_records(patient_id);
    CREATE INDEX IF NOT EXISTS        idx_appointments_patient_id    ON appointments(patient_id);
    CREATE INDEX IF NOT EXISTS        idx_appointments_doctor_id     ON appointments(doctor_id);
    CREATE UNIQUE INDEX IF NOT EXISTS idx_sessions_key               ON sessions(key);

  COMMIT;

  `, (err) => {
    if (err !== null) {
      console.log('Error during schema setup')
      console.log(err)
      process.exit(1)
    } else {
      next()
    }
  })
}
