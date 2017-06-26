#! /bin/bash

psql -d postgres -c "CREATE USER health_portal_test_user WITH PASSWORD ''"
psql -d postgres -c "CREATE DATABASE health_portal_test WITH OWNER health_portal_test_user"
psql -d health_portal_test -c 'CREATE EXTENSION chkpass'
psql -d health_portal_test -U health_portal_test_user -f './db/schema.sql'
psql -d health_portal_test -U health_portal_test_user -f './db/mock-data.sql'
