const initDb        = require('./initDb')
const initSchema    = require('./initSchema')
const initMockData  = require('./initMockData')
const initWebServer = require('./initWebServer')

// Initialization Pipelien

initDb((db) => {
  console.log('Database initialized')
  initSchema(db, () => {
    console.log('Schema initialized')
    initMockData(db, () => {
      console.log('Mock data initialized')
      initWebServer(db, (app) => {
        console.log('API server initialized')
      })
    })
  })
})
