import { Router } from 'express'
import {
  me,
  updateMe,
  uploadAvatar,
  setAvatar,
  deleteAvatar,
  getAvatar
} from './user.controller'

const router = Router()

router.get('/', me)
router.put('/', updateMe)

router
  .post(
    '/avatar',
    uploadAvatar.single('avatar'),
    setAvatar,
    (error, req, res, next) => {
      res.status(400).send({
        error: error.message
      })
    }
  )
  .delete('/avatar', deleteAvatar)
  .get('/:id/avatar', getAvatar)

export default router
