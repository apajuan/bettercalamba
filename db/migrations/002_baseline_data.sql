-- OpenLGU Baseline Data — Seed reference records
-- Migration: 002_baseline_data.sql
--
-- Contains only manually maintained reference data:
-- - Terms (4 Sangguniang Panlungsod terms for City of Calamba)
-- - Persons, memberships, committees populated by data migration script
--
-- Run AFTER 001_initial_schema.sql and BEFORE data migration script.

INSERT INTO terms (id, term_number, ordinal, name, start_date, end_date, year_range) VALUES
  ('sp_9',  9,  '9th',  '9th Sangguniang Panlungsod',  '2016-07-01', '2019-06-30', '2016-2019'),
  ('sp_10', 10, '10th', '10th Sangguniang Panlungsod', '2019-07-01', '2022-06-30', '2019-2022'),
  ('sp_11', 11, '11th', '11th Sangguniang Panlungsod', '2022-07-01', '2025-06-30', '2022-2025'),
  ('sp_12', 12, '12th', '12th Sangguniang Panlungsod', '2025-07-01', '2028-06-30', '2025-2028');

INSERT INTO schema_migrations (name) VALUES ('001_initial_schema.sql');
INSERT INTO schema_migrations (name) VALUES ('002_baseline_data.sql');
