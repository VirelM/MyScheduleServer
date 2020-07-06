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
    ('HopScotch21', 'Kevin Tran', 1,'$2a$12$tuLFr6coOQ7lBEnbO.ew5uR17w3XE.dBDhrS1nuxb.ZqkrVT5kuc.', TRUE);

COMMIT;