BEGIN;

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
  expires_at  timestamp NOT NULL,
  created_at  timestamp NOT NULL,
  updated_at  timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS doctors (
  id             bigserial PRIMARY KEY,
  user_id        bigint                REFERENCES users ON DELETE RESTRICT,
  created_at     timestamp NOT NULL,
  updated_at     timestamp NOT NULL,
  last_name      text      NOT NULL,
  first_name     text      NOT NULL
);

CREATE TABLE IF NOT EXISTS patients (
  id               bigserial PRIMARY KEY,
  age              bigint    NOT NULL,
  user_id          bigint                REFERENCES users ON DELETE RESTRICT,
  last_name        text      NOT NULL,
  first_name       text      NOT NULL,
  created_at       timestamp NOT NULL,
  updated_at       timestamp NOT NULL,
  phone_number     text,
  address_line_1   text,
  address_line_2   text,
  address_city     text,
  address_state    text,
  address_zip_code text
);

CREATE TABLE IF NOT EXISTS medical_records (
  id             serial    PRIMARY KEY,
  patient_id     bigint    NOT NULL     REFERENCES patients ON DELETE RESTRICT,
  created_at     timestamp NOT NULL,
  updated_at     timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS appointments (
  id             bigserial PRIMARY KEY,
  purpose        text      NOT NULL,
  doctor_id      bigint    NOT NULL    REFERENCES doctors  ON DELETE RESTRICT,
  patient_id     bigint    NOT NULL    REFERENCES patients ON DELETE RESTRICT,
  created_at     timestamp NOT NULL,
  updated_at     timestamp NOT NULL,
  canceled_at    timestamp,
  cancel_reason  text,
  approved_at    timestamp,
  appointment_at timestamp NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email                ON users(email);
CREATE INDEX IF NOT EXISTS        idx_doctors_user_id            ON doctors(user_id);
CREATE INDEX IF NOT EXISTS        idx_patients_user_id           ON patients(user_id);
CREATE INDEX IF NOT EXISTS        idx_medical_records_patient_id ON medical_records(patient_id);
CREATE INDEX IF NOT EXISTS        idx_appointments_patient_id    ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS        idx_appointments_doctor_id     ON appointments(doctor_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_sessions_key               ON sessions(key);

COMMIT;
