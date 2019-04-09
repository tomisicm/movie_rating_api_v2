import { crudControllers } from '../../utils/crud'
import { Star } from './star.model'
import { _ } from 'lodash'

const searchStars = async (req, res) => {
  let rq = req.query
  let query = null
  if (!_.isEmpty(rq)) {
    query = {
      $or: [
        { 'name.first': { $regex: rq.query, $options: 'i' } },
        { 'name.last': { $regex: rq.query, $options: 'i' } }
      ]
    }
  }

  try {
    const docs = await Star.find(query).exec()

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export default {
  ...crudControllers(Star),
  searchStars: searchStars
}
