\echo 'Delete and recreate digitcg db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE digitcg;
CREATE DATABASE digitcg;
\connect digitcg

\i digitcg-schema.sql
\i digitcg-seed.sql

\echo 'Delete and recreate digitcg_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE digitcg_test;
CREATE DATABASE digitcg_test;
\connect digitcg_test

\i digitcg-schema.sql
