// import { crudControllers } from '../../utils/crud'
import { Rating } from './rating.model'
import { Movie } from './../movie/movie.model'
import mongoose from 'mongoose'

const createOrUpdateOne = async (req, res) => {
  const createdBy = req.user._id
  try {
    const rating = await Rating.update(
      { createdBy, item: req.body.item },
      { ...req.body, createdBy },
      { upsert: true }
    )

    await Movie.findByIdAndUpdate(
      { _id: req.body.item },
      {
        $inc: { ratingCounter: +1 }
      }
    )

    res.status(201).json({ data: rating })
  } catch (e) {
    console.error(e)
    res.status(400).send(e)
  }
}

const getOneForItem = async (req, res) => {
  try {
    let docs = await Rating.findOne({
      createdBy: req.user._id,
      item: req.params.itemId
    })
      .lean()
      .exec()

    if (!docs) {
      docs = {}
    }

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

/* 
const getAllRatings = async (req, res) => {
  try {
    const docs = await Rating.find({ item: req.item })
      .lean()
      .exec()

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
} 
*/

const getItemsAverageRating = async (req, res) => {
  try {
    const doc = await Rating.aggregate(
      [
        {
          $match: {
            item: new mongoose.Types.ObjectId(req.params.itemId)
          }
        },
        {
          $group: {
            _id: null,
            averageRating: {
              $avg: '$value'
            }
          }
        }
      ],
      function(err, result) {
        if (err) {
          console.error(err)
          return res.status(400).end()
        }
        res.status(200).json({ data: doc })
      }
    )
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export default {
  createOrUpdateOne,
  getOneForItem,
  getItemsAverageRating
}
