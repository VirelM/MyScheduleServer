BEGIN;

TRUNCATE
    stores,
    users,
    schedules
    RESTART IDENTITY CASCADE;

INSERT INTO stores ("location") VALUES
    ('Reseda'),
    ('Van Nuys'),
    ('Glendale');

INSERT INTO users (userid, full_name, store, "password", "admin" ) VALUES
    ('HopScotch21', 'Kevin Tran', 1,'$2a$12$te0pC20uCY5660hDf4uHieR9dVQakdFSUxM97J4BGpqBltHFQQGuW', TRUE);

COMMIT;