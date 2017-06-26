const get    = require('lodash/get')
const uuidv4 = require('uuid/v4')

module.exports = {

  matchUserCreds(db, { email, password, userType }, next) {
    const sql = `
      select * from users
        where email    = $1
          and type     = $2
          and password = $3
    `
    db.query(sql, [email, userType, password], (err, result) => next(err, get(result, ['rows', 0, 'id'])))
  },

  matchUserSession(db, { sessionKey }, next) {
    const sql = `
      select
          u.*,
          d.id as own_doctor_id,
          p.id as own_patient_id
        from users u
        left join sessions s on u.id = s.user_id
        left join patients p on u.id = p.user_id
        left join doctors  d on u.id = d.user_id
        where s.key = $1::uuid
          and s.expires_at > now()
    `
    db.query(sql, [sessionKey], (err, result) => next(err, get(result, ['rows', 0])))
  },

  createSession(db, { userId }, next) {
    const key = uuidv4()
    const sql = `
      insert into sessions
        (key, user_id, created_at, updated_at, expires_at)
        values ($1::uuid, $2::bigint, now(), now(), now() + (60 ||' minutes')::interval)
    `

    db.query(sql, [key, userId], (err, result) => next(err, key))
  },

  expireSession(db, { sessionKey }, next) {
    const sql = `
      update sessions set expires_at = now() where key = $1::uuid
    `

    db.query(sql, [sessionKey], (err) => next(err))
  },

  getPatientList(db, { search, page, limit }, next) {
    const offset    = (page * limit)
    const andSearch = search.replace(/\S(\s)+\S/ig, ' & ')

    const sqlWithSearch = (`
      with search_table as (
        select *, to_tsvector(first_name || ' ' || last_name) as name_vector
        from patients
      )
      select * from search_table
          where name_vector @@ to_tsquery($1)
             or phone_number LIKE '%$1%'
          limit $2::int
         offset $3::int
    `)

    const sqlWithoutSearch = (`select * from patients limit $1::int offset $2::int`)

    const sql  = (!!search) ? sqlWithSearch : sqlWithoutSearch
    const args = (!!search) ? [andSearch, limit, offset] : [limit, offset]

    db.query(sql, args, (err, result) => next(err, get(result, 'rows')))
  },

  getPatientData(db, { patientId }, next) {
    const sql = `select * from patients where id = $1::bigint`
    db.query(sql, [patientId], (err, result) => next(err, get(result, ['rows', 0])))
  },

  getPatientDataForSession(db, { sessionKey }, next) {
    const sql = `
      select p.*
        from patients p
        left join users u on u.id = p.user_id
        left join sessions s on s.user_id = u.id
       where s.key = $1::uuid
    `
    db.query(sql, [sessionKey], (err, result) => next(err, get(result, ['rows', 0])))
  },

  getDoctors(db, next) {
    const sql = `select * from doctors`
    db.query(sql, (err, result) => next(err, get(result, 'rows')))
  },

  createAppointment(db, { purpose, doctorId, patientId, appointmentDate }, next) {
    const sql = `
      insert into appointments (purpose, doctor_id, patient_id, appointment_at, updated_at, created_at)
        values ($1::text, $2::bigint, $3::bigint, $4::timestamp, now(), now())
    `

    db.query(sql, [purpose, doctorId, patientId, appointmentDate], (err, result) => next(err))
  },

  approveAppointment(db, { appointmentId }, next) {
    const sql = `
      update appointments set updated_at=now(), approved_at=now() where id=$1::bigint
    `
    db.query(sql, [appointmentId], (err) => next(err))
  },

  cancelAppointment(db, { appointmentId, cancelReason }, next) {
    const sql = `
      update appointments set updated_at=now(), canceled_at=now(), cancel_reason=$1::text where id=$2::bigint
    `
    db.query(sql, [cancelReason, appointmentId], (err) => next(err))
  },

  getPatientAppointments(db, { patientId }, next) {
    const sql = `
      select * from appointments where patient_id = $1::bigint
    `

    db.query(sql, [patientId], (err, result) => next(err, get(result, 'rows')))
  }

}
