import { Router } from 'express'
import controllers from './star.controller'

const router = Router()

router
  .route('/')
  .get(controllers.getMeny)
  .post(controllers.createOne)

router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router
