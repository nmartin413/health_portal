# Health Portal App

## Summary
The Health Portal App is an example app where patients and doctors can manage their appointments. Headline technologies include:

- an Express HTTP server for it's backend
- a React SPA app for it's frontend framework
- a PostgreSQL database for persistence

See the "Design Topics" section below for more in-depth technical notes on patterns found within the repo.

## Get running

##### system deps
- Postgres (`pg_ctl`, `psql`, `initdb`) [install guide](https://wiki.postgresql.org/wiki/Detailed_installation_guides)
- Postgres Contrib (`uuid-ossp` and `chkpass`)
- Node JS (tested with v6.10.3)

##### setup
- clone repo
- ensure you're on NodeJS v6 (nvm users can just run `nvm use` in the directory)
- run `npm install` to install the node dependencies
- run `npm run init-pg` to setup the local postgres database
- run `npm run start-pg` to start the local postgres database
- run `npm run init-db` to load the application's schema & sample data

##### running the app
- run `npm start` to run the Webpack Dev Server (UI), the Express app and the SCSS build/watch loop
- you can also run the following commands separately to achieve the same effect:
  - `npm run watch-css`
  - `npm run start-ui`
  - `npm run watch-server`

##### logging into the app
- the test patient account login is: `patient@patient.com` / `patient`
- the test doctor account login is: `doctor@doctor.com` / `doctor`

##### running the tests
- run `npm test` to run the Jest-based tests

## Design Topics

##### DB Schema & Querying
- Table Summary
  - `users` - table of accounts which can be logged into the app. Home of authentication information
  - `sessions` - table of session tokens (which expire) that are used once a user has authenticated
  - `patients` - table of patient records, which are optionally linked to users
  - `doctors` - table doctor records, which are optionally linked to doctors
  - `appointments` - table of appointments which must link to doctors and users
- Foreign key constraints are used wherever possible to ensure referrential integrity
- In the web server code, the various SQL queries used by the endpoints are abstracted as functions in a `queries` module, instead of being accessed through an ORM or inline SQL statements in endpoint code. This has the pleasant effect of creating a very clear and evident "inventory" of the discreet ways in which the database is interacted with.

##### Auth
The web server is a standard implementation of Express v4. 

##### UI

## Future Improvements
- Pooling of Postgres DB connections
- Tests for front end components
