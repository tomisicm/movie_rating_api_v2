import { crudControllers } from '../../utils/crud'
import { Genre } from './genre.model'

const getAllGenres = async (req, res) => {
  const search = {}

  if (req.query.type) {
    search.type = req.query.type
  }

  try {
    const docs = await Genre.find(search)
      .select({ name: 1, type: 1 })
      .lean()
      .exec()

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const updateGenre = async (req, res) => {
  try {
    const updatedDoc = await Genre.findOneAndUpdate(
      {
        _id: req.params.id
      },
      req.body,
      { new: true }
    )
      .lean()
      .exec()

    if (!updatedDoc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: updatedDoc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const deleteGenre = async (req, res) => {
  try {
    const removed = await Genre.findOneAndRemove({
      _id: req.params.id
    })

    if (!removed) {
      return res.status(400).end()
    }

    return res.status(200).json({ data: removed })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export default {
  ...crudControllers(Genre),
  getAllGenres: getAllGenres,
  updateOne: updateGenre,
  removeOne: deleteGenre
}
