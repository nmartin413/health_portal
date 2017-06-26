const initDb        = require('./initDb')
const initWebServer = require('./initWebServer')

initDb((db) => {
  console.log('Database initialized')
  initWebServer(db, (app) => {
    console.log('API server initialized')
  })
})
