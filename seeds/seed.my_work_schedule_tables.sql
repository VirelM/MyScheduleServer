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
    ('HopScotch21', 'Kevin Tran', 1,'diddleyDiddley', TRUE),
    ('TheRealSlimShady89', 'Josh Hucker', 1, 'ohOhguessitsbubblewrap', FALSE ),
    ('ChubbyBunny', 'Anita Avalor', 1, 'Aimee12345', FALSE);
INSERT INTO schedules (userid, startMon, endMon, startWed, endWed, startThurs, endThurs, startSat, endSat) VALUES
    (2, '2020-6-22 08:00:00 AM', '2020-6-22 04:00:00 PM','2020-6-24 08:00:00 AM', '2020-6-24 04:00:00 PM', '2020-6-25 10:00:00 AM', '2020-6-25 03:00:00 PM', '2020-6-27 06:00:00 PM', '2020-6-27 10:00:00 PM'),
    (3, '2020-6-22 04:00:00 PM', '2020-6-22 10:00:00 PM', null, null, null,null,null,null);

COMMIT;