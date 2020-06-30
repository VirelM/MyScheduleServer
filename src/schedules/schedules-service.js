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
    getByIdS(db,id){
        return SchedulesService.getAllSchedules(db)
            .where('id', id)
            .first()
    },
    insertSchedule(db, newSchedule){
        console.log(newSchedule);
        return db
            .insert(newSchedule)
            .into('schedules')
            // .returning('*')
            // .then((schedule)=> schedule)
            // .then(schedule =>
            //     SchedulesService.getByIdS(db, schedule.id)
            // )
    },
    getAllSchedulesbyUserId(db,userid){
        return db 
            .from('schedules')
            .select('*')
            .where('userid',userid)
    }
}

module.exports = SchedulesService