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
    ('Admin1', 'Kevin Tran', 1,'$2a$12$te0pC20uCY5660hDf4uHieR9dVQakdFSUxM97J4BGpqBltHFQQGuW', TRUE),
    ('Admin2', 'Michaelangelo', 2,'$2a$12$te0pC20uCY5660hDf4uHieR9dVQakdFSUxM97J4BGpqBltHFQQGuW', TRUE),
    ('Admin3', 'Chuck', 3,'$2a$12$te0pC20uCY5660hDf4uHieR9dVQakdFSUxM97J4BGpqBltHFQQGuW', TRUE);

COMMIT;