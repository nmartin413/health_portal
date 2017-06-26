# Health Portal App

## Summary
The Health Portal App is an example app where patients and doctors can manage their appointments. Headline technologies include:

- an Express HTTP server for it's backend
- a React SPA app for it's frontend framework
- a PostgreSQL database for persistence

See the "Design Topics" section below for more in-depth technical notes on patterns found within the repo.

## Get running

##### system deps
- PostgreSQL (`pg_ctl`, `psql`, `initdb`)
- PostgreSQL Contrib (`uuid-ossp` and `chkpass`)
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
- The app will attempt to create a Postgres "database" named "health_portal" and an associated "health_portal_user" to access the database
- In the web server code, the various SQL queries used by the endpoints are abstracted as functions in a `queries` module, instead of being accessed through an ORM or inline SQL statements in endpoint code. This has the pleasant effect of creating a very clear and evident "inventory" of the discreet ways in which the database is interacted with.

##### Auth & Security
- The web server is a standard implementation of Express v4, using a few common "parser" libraries for the interpretation of JSON and cookies
- Endpoints are grouped into 4 verticals with the following prefixes:
  - `/auth-api/*` endpoints, are involved in the management of sessions and have no global auth requirements
  - `/doctor-api/*` endpoints will only work for sessions associated with doctor users
  - `/patient-api/*` endpoints will only work for sessions associated with patient users
  - `/shared-api/*` endpoints will work for both doctors and patients
- The `/patient-api/*` endpoints should prefer using `**/me` style endpoints (where the keys to tables are inferred from the session token) whenever possible, to minimize the number of potential ways in which an API could be compromised
- Auth stickiness is implemented as an `HTTPOnly` cookie. This mitigates risk of browser-originating malicious attacks on the server.
- Standard security practices such as using parameterized and typed SQL queries are observed

##### Client Data & Payload Design
The client uses the popular `redux` framework to manage data on the frontend. Endpoint response payloads are tailored and optimized for the front end experience to minimize the number of outbound HTTP requests and keep the front end data management code as light as possible. A potential downside to this approach is that the API is relatively coupled to the current frontend (and front ends implementing similar features). However, since there is no current need for a more generic REST implemenation, the realizable benefits likely outweigh the theoretical costs.

- The `session` endpoints also include "side-loaded" data for bootstrapping the app, such as the list of `doctors` in the system.
- While most entities closely resemble their Postgres schemas, the `user` object includes joined fields such as `own_patient_id` and `own_doctor_id` to make front end code more concise and clear.

##### Components & Styles
- `create-react-app` was used to skeleton the app, which is a packaged configuration of a `react` setup with a supporting `babel` and `webpack` build system.
- `react-router` is used to manage high-level routing of the app. These routes are expressed in the `App` component, which either redirects the user to another route or renders a component from the `components/pages` directory, which serve as high-level composers of other components.
- Common controls are modelled as components to create re-usable interface elements across the application. ex: `Button` and `LabeledInput`
- Views such as `PatientDetail` and `AppointmentDetail` are contextualized to either a doctor or patient context using the `session` data and their parent components.

##### Styles
- Styles are written in SCSS. There exist both styles that are tied to specific React components as well as styles used in multiple components. The idea here is to attach styles to components when it makes sense, but not be beholden to the concept, as single-component and cross-component styling strategies are by no means mutually exclusive.
- Styles use class names that follow a `[Component]-[element]` naming scheme with optional `[modifier]` classes. ex:
  - `.Button danger`
  - `.Button`
  - `.TopNav-link active`
  - `.TopNav-link`
- Styles which are tied to specific components use the React class name as their `[Component]` name.

## Future Improvements
- Pooling of Postgres DB connections
- Tests for front end components
- Implement Medical Record uploads
- Implementation of `watson` (or similar) logging framework for HTTP and Postgres requests on the web server
- Database Record-level security measures (ensuring there's rules on who can see what rows, beyond the endpoint security)
