import { User } from './user.model'
import multer from 'multer'
import _ from 'lodash'

/* deviation from standard REST API structure */
/* user can only get his info and update his info */

export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    res.status(200).send(user.toJSON())
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

// user updates his data
export const updateMe = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true
    })
      .lean()
      .exec()

    res.status(200).json({ data: user })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const getMany = async (req, res) => {
  let rq = req.query
  const { perPage, page } = req.query

  let query = null
  if (!_.isEmpty(rq)) {
    query = {
      $or: [
        // eslint-disable-next-line prettier/prettier
        { 'name': { $regex: rq.query, $options: 'i' } }
        // this will be expaned later once i add user profile section
        // where the plebs will be able to input first or last name
      ]
    }
  }
  const options = {
    sort: 'createdAt',
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10
  }

  try {
    const docs = await User.paginate(query, options)

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

// this middleware might be in seperate file
export const uploadAvatar = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new Error('file must be of jpg, jpeg or png format and less than 1mb.')
      )
    }
    cb(undefined, true)
  }
})

export const setAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    user.avatar = req.file.buffer
    await user.save()
    res.status(200).send()
  } catch (e) {
    res.status(400).send()
  }
}

export const deleteAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    user.avatar = undefined
    await user.save()
    res.status(200).send()
  } catch (e) {
    res.status(400).send()
  }
}

export const getAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    res.set('Content-Type', 'image/jpg')
    res.send(user.avatar)
  } catch (e) {
    res.status(400).end()
  }
}
