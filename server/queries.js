const get    = require('lodash/get')
const uuidv4 = require('uuid/v4')

module.exports = {

  matchUserCreds(db, { email, password, userType }, next) {
    const sql = `
      select * from users
        where email    = $1
        and   type     = $2
        and   password = $3
    `
    db.query(sql, [email, userType, password], (err, result) => next(err, get(result, ['rows', 0])))
  },

  matchUserSession(db, { sessionKey }, next) {
    const sql = `
      select u.* from users u
        join sessions s on u.id = s.user_id
        where s.key = $1::uuid
    `
    db.query(sql, [sessionKey], (err, result) => next(err, get(result, ['rows', 0])))
  },

  createSession(db, { userId }, next) {
    const key = uuidv4()
    const sql = `
      insert into sessions
        (key, user_id, created_at, updated_at)
        values ($1::uuid, $2::bigint, now(), now())
    `

    db.query(sql, [key, userId], (err, result) => next(err, key))
  },

  getPatientList(db, { search, page, limit }, next) {
    const andSearch = search.replace(/\S(\s)+\S/ig, ' & ')

    const sql = `
      with search_table as (
        select *, to_tsvector(first_name || ' ' || last_name || ' ' || middle_name) as name_vector
        from patients
      )
      select * from search_table where
        name_vector @@ to_tsquery($1) or
        phone_number LIKE %$1%
    `

    db.query(sql, [andSearch], (err, result) => next(err, get(result, 'rows')))
  }

}
