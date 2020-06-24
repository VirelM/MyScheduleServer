const express = require('express')
const SchedulesService = require('./schedules-service');
const {requireAuth}=require('../middleware/jwt-auth');

const ScheduleRouter = express.Router()

ScheduleRouter
  .route('/api')
  .get((req, res, next) => {
    SchedulesService.getAllSchedules(req.app.get('db'))
      .then(Schedules => {
        res.json(SchedulesService.serializeSchedules(Schedules))
      })
      .catch(next)
  })

SchedulesRouter
  .route('/:thing_id')
  .all(requireAuth)
  .all(checkThingExists)
  .get((req, res) => {
    res.json(SchedulesService.serializeThing(res.thing))
  })

SchedulesRouter.route('/:thing_id/reviews/')
  .all(requireAuth)
  .all(checkThingExists)
  .get((req, res, next) => {
    SchedulesService.getReviewsForThing(
      req.app.get('db'),
      req.params.thing_id
    )
      .then(reviews => {
        res.json(SchedulesService.serializeThingReviews(reviews))
      })
      .catch(next)
  })

/* async/await syntax for promises */
async function checkThingExists(req, res, next) {
  try {
    const thing = await SchedulesService.getById(
      req.app.get('db'),
      req.params.thing_id
    )

    if (!thing)
      return res.status(404).json({
        error: `Thing doesn't exist`
      })

    res.thing = thing
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = SchedulesRouter