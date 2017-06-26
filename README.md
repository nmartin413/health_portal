Health Portal App

### Summary

The Health Portal App is an example app where patients and doctors can manage their appointments. Notable technologies:

- an Express HTTP server for it's backend
- a React SPA app for it's frontend framework
- a PostgreSQL database for persistence
- SCSS for it's stylesheets

### Get running

#### system deps
- Postgres (`pg_ctl`, `psql`, `initdb`) [install guide](https://wiki.postgresql.org/wiki/Detailed_installation_guides)
- Node JS (tested with v6.10.3)

#### setup
- clone repo
- ensure you're on NodeJS v6 (nvm users can just run `nvm use` in the directory)
- run `npm install` to install the node dependencies
- run `npm run init-pg` to setup the local postgres database
- run `npm run start-pg` to start the local postgres database
- run `npm run init-db` to load the application's schema & sample data

#### running the app
- run `npm start` to run the Webpack Dev Server (UI), the Express app and the SCSS build/watch loop
- you can also run the following commands separately to achieve the same effect:
  - `npm run watch-css`
  - `npm run start-ui`
  - `npm run watch-server`

#### logging into the app
- the test patient account login is: `patient@patient.com` / `patient`
- the test doctor account login is: `doctor@doctor.com` / `doctor`

#### running the tests
- run `npm test` to run the Jest-based tests
