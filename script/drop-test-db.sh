#! /bin/bash

psql -U health_portal_test_user -w -d postgres -c "DROP DATABASE IF EXISTS health_portal_test"
psql -d postgres -c "DROP USER IF EXISTS health_portal_test_user"
