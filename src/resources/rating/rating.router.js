import { Router } from 'express'
import controllers from './rating.controller'

const router = Router()

router.route('/').post(controllers.createOrUpdateOne)
router.route('/item/:itemId').get(controllers.getOneForItem)
router.route('/itemavg/:itemId').get(controllers.getItemsAverageRating)

export default router
