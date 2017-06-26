BEGIN;

INSERT INTO users (id, type, email, password, created_at, updated_at) values (
  101,
  'doctor-user',
  'doctor@doctor.com',
  'doctor',
  now(),
  now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO users (id, type, email, password, created_at, updated_at) values (
  102,
  'patient-user',
  'patient@patient.com',
  'patient',
  now(),
  now()
) ON CONFLICT (id) DO NOTHING;

INSERT INTO doctors (id, user_id, created_at, updated_at, last_name, first_name)
  values (201, 101, now(), now(), 'Dietrich', 'Daniel')
  ON CONFLICT (id) DO NOTHING;

INSERT INTO doctors (id, user_id, created_at, updated_at, last_name, first_name)
  values (202, NULL, now(), now(), 'Radcliffe', 'Regina')
  ON CONFLICT (id) DO NOTHING;

INSERT INTO patients (id, age, user_id, last_name, first_name, created_at, updated_at, phone_number, address_line_1, address_line_2, address_city, address_state, address_zip_code) values
  (301, 27, 102, 'Pavil', 'Patsy', now(), now(), '+1-123-456-7890', '123 Pumpkin Place', 'Platz 1', 'Chicago', 'IL', '60640')
  ON CONFLICT (id) DO NOTHING;

INSERT INTO patients (id, age, user_id, last_name, first_name, created_at, updated_at) values
  (302, 28, NULL, 'West', 'Ruth', now(), now())
  ON CONFLICT (id) DO NOTHING;

INSERT INTO patients (id, age, user_id, last_name, first_name, created_at, updated_at) values
  (303, 42, NULL, 'Anderson', 'Lois', now(), now())
  ON CONFLICT (id) DO NOTHING;

INSERT INTO patients (id, age, user_id, last_name, first_name, created_at, updated_at) values
  (304, 35, NULL, 'Fisher', 'Brandon', now(), now())
  ON CONFLICT (id) DO NOTHING;

INSERT INTO patients (id, age, user_id, last_name, first_name, created_at, updated_at) values
  (305, 65, NULL, 'McCarthy', 'Grace', now(), now())
  ON CONFLICT (id) DO NOTHING;

COMMIT;
