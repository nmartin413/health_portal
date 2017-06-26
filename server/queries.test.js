const initDb  = require('./initDb')
const queries = require('./queries')

var db

beforeEach((done) => {
  initDb((dbInstance) => {
    db = dbInstance
    done()
  })
})

afterEach((done) => {
  db.end(() => done())
})

describe('matchUserCreds', () => {

  test('it should return a user id', (done) => {
    const params = { email: 'doctor@doctor.com', password: 'doctor', userType: 'doctor-user' }
    queries.matchUserCreds(db, params, (err, userId) => {
      expect(err).toBeNull()
      expect(userId).toBe('101')
      done()
    })
  })

})

describe('matchUserSession', () => {

  test('it retrieve a user from a session key, for the doctor', (done) => {
    queries.createSession(db, { userId: 101 }, (err, sessionKey) => {
      expect(err).toBeNull()
      queries.matchUserSession(db, { sessionKey }, (err, user) => {
        expect(err).toBeNull()
        expect(user.id).toBe('101')
        expect(user.own_doctor_id).toBe('201')
        expect(user.own_patient_id).toBeNull()
        done()
      })
    })
  })

  test('it retrieve a user from a session key, for the patient', (done) => {
    queries.createSession(db, { userId: 102 }, (err, sessionKey) => {
      expect(err).toBeNull()
      queries.matchUserSession(db, { sessionKey }, (err, user) => {
        expect(err).toBeNull()
        expect(user.id).toBe('102')
        expect(user.own_doctor_id).toBeNull()
        expect(user.own_patient_id).toBe('301')
        done()
      })
    })
  })

})

describe('createSession', () => {

  test('it should create a session', (done) => {
    const params = { userId: 101 }
    queries.createSession(db, params, (err, sessionKey) => {
      expect(err).toBeNull()
      expect(sessionKey).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)

      db.query('select * from sessions where key=$1::uuid', [sessionKey], (err, result) => {
        expect(err).toBeNull()
        expect(result.rows[0].user_id).toBe('101')
        done()
      })
    })
  })

})

describe('getPatientDataForSession', () => {

  test('it should retrieve a patient record by session key', (done) => {
    queries.createSession(db, { userId: 102 }, (err, sessionKey) => {
      expect(err).toBeNull()

      queries.getPatientDataForSession(db, { sessionKey }, (err, patient) => {
        expect(err).toBeNull()
        expect(patient.first_name).toBe('Patsy')
        done()
      })
    })
  })

})
