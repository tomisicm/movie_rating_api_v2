import { Router } from 'express'
import controllers from './message.controller'

const router = Router()

router
  .route('/')
  .post(controllers.createOne)
  .get(controllers.getAllMessages)

export default router
