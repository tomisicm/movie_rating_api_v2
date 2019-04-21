import controllers from './../movie.controller'
import { Movie } from './../movie.model'
// import { User } from '../../resources/user/user.model'
import mongoose from 'mongoose'

describe('Movie crud controllers', () => {
  describe('getOne', async () => {
    test('finds movie by authenticated user and id', async () => {
      expect.assertions(2)

      const user = mongoose.Types.ObjectId()

      let movie = movieFactory(user)

      movie = await Movie.create(movie)

      const req = {
        params: {
          id: movie._id
        },
        user: {
          _id: user
        }
      }

      const res = {
        status(status) {
          expect(status).toBe(200)
          return this
        },
        json(result) {
          expect(result.data._id.toString()).toBe(movie._id.toString())
        }
      }

      await controllers.getOne(req, res)
    })
  })

  // createOne also handles rating creation, ratingCounter did not increment?
  //
  describe('createOne', () => {
    test('creates a new movie and rating doc', async () => {
      expect.assertions(4)

      const user = mongoose.Types.ObjectId()

      let movie = movieFactory(user)

      const req = {
        user: { _id: user },
        body: { ...movie, rating: 3 }
      }

      const res = {
        status(status) {
          expect(status).toBe(201)
          return this
        },
        json(results) {
          expect(results.data.createdBy).toBe(user)
          expect(results.data.title).toBe(movie.title)
          expect(results.data.commentSection).toBe(movie.commentSection)
        }
      }

      await controllers.createMovie(req, res)
    })
  })
})

// seperate file with get/set
const movieFactory = function(user) {
  const genre = mongoose.Types.ObjectId()
  const star = mongoose.Types.ObjectId()

  return {
    createdBy: user,
    title: 'what ever',
    genre: genre,
    star: star,
    commentSection: 'open'
  }
}
