import { Router } from 'express'
import controllers from './comment.controller'

const router = Router()

router
  .route('/')
  .get(controllers.getMany)
  .post(controllers.createOne)

router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

router.route('/item/:itemId').get(controllers.getCommentsByItemId)

export default router
