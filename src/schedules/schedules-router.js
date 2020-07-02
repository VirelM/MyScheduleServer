const express = require('express');
const path = require('path');
const SchedulesService = require('./schedules-service');
const {requireAuth}=require('../middleware/jwt-auth');
const jsonBodyParser = express.json();
const SchedulesRouter = express.Router()

SchedulesRouter
  .route('/all')
  .get((req, res) => {
    SchedulesService.getAllSchedules(req.app.get('db'))
      .then(Schedules => {
        res.json(Schedules)
      })
  })

SchedulesRouter
  .route('/dashboard/:dashboard_id')
  .all(requireAuth)
  .all(checkThingExists)
  .get((req, res) => {
    res.json(SchedulesService.serializeThing(res.thing))
  })

SchedulesRouter
  .route('/')
  .all(requireAuth)
  .get(jsonBodyParser,(req,res)=>{
    console.log(req.user)
    SchedulesService.getAllSchedulesbyUserId(req.app.get('db'),
    req.user.userid)
      .then(schedules=>{
        res.json(schedules)
      })
  })
SchedulesRouter
.route('/')
.post(requireAuth, jsonBodyParser, (req, res, next)=>{
  const { userid, 
    startMon, endMon, 
    startTues, endTues, 
    startWed, endWed,
    startThurs, endThurs,
    startFri, endFri,
    startSat, endSat,
    startSun, endSun
  } = req.body;
  console.log(userid, 
    startMon, endMon, 
    startTues, endTues, 
    startWed, endWed,
    startThurs, endThurs,
    startFri, endFri,
    startSat, endSat,
    startSun, endSun);
  
  // const newSchedule = { userid, 
  //   startmon: startMon, endmon:endMon, 
  //   starttues:startTues, endtues:endTues, 
  //   startwed:startWed, endwed:endWed,
  //   startthurs:startThurs, endthurs:endThurs,
  //   startfri:startFri, endfri:endFri,
  //   startsat:startSat, endsat: endSat,
  //   startsun:startSun, endsun:endSun
  // };
  const newSchedule = { userid, 
    startMon, endMon, 
    startTues, endTues, 
    startWed, endWed,
    startThurs, endThurs,
    startFri, endFri,
    startSat, endSat,
    startSun, endSun
  };
  for (const [key, value] of Object.entries(newSchedule)){
    if (value == ""){
      newSchedule[key] = null;
    }
  }

  // for (const [key, value] of Object.entries(newSchedule))
  //     if (value == null)
  //       return res.status(400).json({
  //         error: `Missing '${key}' in request body`
  //       })
  SchedulesService.insertSchedule(
    req.app.get('db'),
    newSchedule
  )
    .then(schedule =>{
      res
        .status(201)
        // .location(path.posix.join(req.originalUrl, `/${schedule.id}`))
        .json(schedule)
    })
    .catch(next)
})
/* async/await syntax for promises */
async function checkThingExists(req, res, next) {
  try {
    const schedule = await SchedulesService.getById(
      req.app.get('db'),
      req.params.thing_id
    )

    if (!schedule)
      return res.status(404).json({
        error: `Thing doesn't exist`
      })

    res.thing = schedule
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = SchedulesRouter