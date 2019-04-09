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

export default {
  ...crudControllers(Genre),
  getAllGenres: getAllGenres
}
