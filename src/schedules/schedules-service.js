const xss = require('xss');

const SchedulesService = {
    getAllSchedules(db){
        return db
            .from('schedules')
            .select('*')
    },
    getById(db,id){
        return SchedulesService.getAllSchedules(db)
            .where('userid', id)
            .first()
    },
    insertSchedule(db, newSchedule){
        return db
            .insert(newSchedule)
            .into('schedules')
            .returning('*')
            .then(([schedule])=> schedule)
            .then(schedule =>
                SchedulesService.getById(db, schedule.id)
            )
    }
}

module.exports = SchedulesService