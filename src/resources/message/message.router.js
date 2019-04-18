import { Router } from 'express'
import controllers from './message.controller'

const router = Router()

router.route('/').post(controllers.createOne)

router.route('/inbox').get(controllers.getAllMessagesSentToMe)
router.route('/outbox').get(controllers.getAllMessagesSentByMe)

router.route('/conv/:id').get(controllers.getAllMessagesForConvo)

export default router
