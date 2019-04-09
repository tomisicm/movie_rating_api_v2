import { Router } from 'express'
import controllers from './movie.controller'

const router = Router()

router
  .route('/')
  .get(controllers.getMany)
  .post(controllers.createOne)

router.route('/all').get(controllers.getAllMovies)

router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router
