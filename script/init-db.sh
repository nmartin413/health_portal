#! /bin/bash

psql -d postgres -c "CREATE USER health_portal_user WITH PASSWORD ''"
psql -d postgres -c "CREATE DATABASE health_portal WITH OWNER health_portal_user"
psql -d health_portal -c 'CREATE EXTENSION chkpass'
psql -d health_portal -U health_portal_user -f './db/schema.sql'
psql -d health_portal -U health_portal_user -f './db/mock-data.sql'
