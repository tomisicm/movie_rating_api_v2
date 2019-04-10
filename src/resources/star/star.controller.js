import { crudControllers } from '../../utils/crud'
import { Star } from './star.model'
import { _ } from 'lodash'

const searchStars = async (req, res) => {
  let rq = req.query
  const { perPage, page } = req.query

  let query = null
  if (!_.isEmpty(rq)) {
    query = {
      $or: [
        { 'name.first': { $regex: rq.query, $options: 'i' } },
        { 'name.last': { $regex: rq.query, $options: 'i' } },
        // eslint-disable-next-line prettier/prettier
        { 'profession': { $regex: rq.query, $options: 'i' } }
      ]
    }
  }
  const options = {
    sort: 'createdAt',
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10
  }

  try {
    const docs = await Star.paginate(query, options)

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export default {
  ...crudControllers(Star),
  getMeny: searchStars
}
