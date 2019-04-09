import { crudControllers } from '../../utils/crud'
import { Comment } from './comment.model'
import { Movie } from './../movie/movie.model'

// import Fawn from 'fawn'

const getCommentsByItemId = async (req, res) => {
  const { perPage, page } = req.query
  const options = {
    populate: {
      path: 'createdBy',
      select: '_id name'
    },
    sort: 'createdAt',
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10,
    lean: true
  }
  try {
    const docs = await Comment.paginate({ item: req.params.itemId }, options)
    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

const createOne = async (req, res) => {
  const createdBy = req.user._id

  try {
    const comment = await Comment.create({ ...req.body, createdBy })
    await Movie.findByIdAndUpdate(
      { _id: req.body.item },
      {
        $inc: { commentCounter: +1 }
      }
    )

    res.status(201).json({ data: comment })
  } catch (e) {
    console.error(e)
    res.status(400).send(e)
  }
}

export default {
  ...crudControllers(Comment),
  createOne,
  getCommentsByItemId
}
