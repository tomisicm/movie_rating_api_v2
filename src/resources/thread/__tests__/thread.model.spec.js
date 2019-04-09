import { Thread } from '../thread.model'
import mongoose from 'mongoose'

describe('Thread model', () => {
  describe('schema', () => {
    test('movieId', () => {
      const movieId = Thread.schema.obj.movieId
      expect(movieId).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'movie',
        required: true
      })
    })

    test('status', () => {
      const status = Thread.schema.obj.status
      expect(status).toEqual({
        type: String,
        required: true,
        enum: ['open', 'closed'],
        default: 'open'
      })
    })

    test('comments', () => {
      const comments = Thread.schema.obj.comments
      expect(comments).toEqual([
        {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'comment'
        }
      ])
    })
  })
})
