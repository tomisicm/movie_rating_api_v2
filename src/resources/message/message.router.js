import { Router } from 'express'
import controllers from './message.controller'

const router = Router()

router
  .route('/')
  .post(controllers.createOne)
  .get(controllers.getAllMessagesSentByMeOrSentToMe)

router.route('/conv/:id').get(controllers.getAllMessagesForConvo)

export default router
