import controllers from './../comment.controller'
import { Comment } from './../comment.model'
// import { Movie } from './../../movie/movie.controller'

import mongoose from 'mongoose'

describe('crud controllers for comment', () => {
  describe('createOne', async () => {
    test('create comment', async () => {
      expect.assertions(2)

      const user = mongoose.Types.ObjectId()
      const movie = mongoose.Types.ObjectId()
      const comment = {
        body: 'I am just a body',
        item: movie
      }

      const req = {
        user: {
          _id: user
        },
        body: comment
      }

      const res = {
        status(status) {
          expect(status).toBe(201)
          return this
        },
        json(results) {
          expect(results.data.body).toBe(comment.body)
        }
      }

      await controllers.createOne(req, res)
    })

    describe('getOne', async () => {
      test('finds comment authenticated user and id', async () => {
        expect.assertions(2)

        const user = mongoose.Types.ObjectId()
        const item = mongoose.Types.ObjectId()

        const comment = await Comment.create({
          body: 'bodyyy',
          item: item,
          createdBy: user
        })

        const req = {
          user: {
            _id: user
          },
          params: {
            id: comment._id
          }
        }

        const res = {
          status(status) {
            expect(status).toBe(200)
            return this
          },
          json(result) {
            expect(result.data._id.toString()).toBe(comment._id.toString())
          }
        }

        await controllers.getOne(req, res)
      })
    })

    describe('getMany', async () => {
      test('finds comments by item id', async () => {
        expect.assertions(2)

        const user1 = mongoose.Types.ObjectId()
        const user2 = mongoose.Types.ObjectId()
        const item = mongoose.Types.ObjectId()

        await Comment.create({
          body: 'bodyyy',
          item: item,
          createdBy: user1
        })

        await Comment.create({
          body: 'bodyyy',
          item: item,
          createdBy: user2
        })

        const req = {
          user: {
            _id: user1
          },
          params: {
            item: item
          },
          query: {
            perPage: 5,
            page: 1
          }
        }

        const res = {
          status(status) {
            expect(status).toBe(200)
            return this
          },
          json(result) {
            expect(result.data.docs).toHaveLength(2)
          }
        }

        await controllers.getCommentsByItemId(req, res)
      })
    })
    describe('removeOne', async () => {
      test('finds comment by authenticated user removes it', async () => {
        expect.assertions(2)

        const user = mongoose.Types.ObjectId()
        const item = mongoose.Types.ObjectId()

        const comment = await Comment.create({
          body: 'bodyyy',
          item: item,
          createdBy: user
        })

        const req = {
          user: {
            _id: user
          },
          params: {
            id: comment._id
          }
        }

        const res = {
          status(status) {
            expect(status).toBe(200)
            return this
          },
          json(result) {
            expect(result.data._id.toString()).toBe(comment._id.toString())
          }
        }

        await controllers.removeOne(req, res)
      })
    })
  })
})
