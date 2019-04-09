import mongoose from 'mongoose'

import { crudControllers } from '../../utils/crud'
import { Movie } from './movie.model'
import { Rating } from './../rating/rating.model'
import { Comment } from './../comment/comment.model'

import Fawn from 'fawn'

Fawn.init(mongoose)

/* 
Given that we are creating movie, 
the first rating for the given movie is also created
*/
const createMovie = async (req, res) => {
  const createdBy = req.user._id

  try {
    const movie = await Movie.create({ ...req.body, createdBy })

    // since there is no rating field on Movie Schema it is silently ignored
    await Rating.create({
      item: movie.id,
      value: req.body.rating,
      createdBy: createdBy
    })

    res.status(201).json({ data: movie })
  } catch (e) {
    console.error(e)
    res.status(400).send(e)
  }
}

const getAllMovies = async (req, res) => {
  try {
    const docs = await Movie.find()
      .populate('createdBy', 'name')
      .populate('genres', 'name')
      .lean()
      .exec()

    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

const getOne = async (req, res) => {
  try {
    const doc = await Movie.findOne({
      createdBy: req.user._id,
      _id: req.params.id
    })
      .populate('genres', 'name -_id')
      .populate('stars', 'name dateOfBirth') // virtuals not working
      .lean()
      .exec()

    if (!doc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

// after movie is removed, remove comments and ratings
const deleteOne = async (req, res) => {
  try {
    const removed = await Movie.findOneAndRemove({
      createdBy: req.user._id,
      _id: req.params.id
    })

    await Comment.deleteMany({
      item: req.params.id
    })

    await Rating.deleteMany({
      item: req.params.id
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
  ...crudControllers(Movie),
  createMovie,
  getOne,
  deleteOne,
  getAllMovies
}
