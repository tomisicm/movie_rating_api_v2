import { Movie } from '../movie.model'
import mongoose from 'mongoose'

describe('Movie model', () => {
  describe('schema', () => {
    test('title', () => {
      const title = Movie.schema.obj.title
      expect(title).toEqual({
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50
      })
    })

    test('description', () => {
      const description = Movie.schema.obj.description
      expect(description).toEqual({
        type: String,
        default: null,
        trim: true,
        maxlength: 1000
      })
    })

    test('genres', () => {
      const genres = Movie.schema.obj.genres
      expect(genres).toEqual([
        {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'genre',
          required: true
        }
      ])
    })

    test('releaseYear', () => {
      const due = Movie.schema.obj.releaseYear
      expect(due).toEqual(Date)
    })

    test('avatar', () => {
      const avatar = Movie.schema.obj.avatar
      expect(avatar).toEqual({
        type: String,
        default: null
      })
    })

    test('createdBy', () => {
      const createdBy = Movie.schema.obj.createdBy
      expect(createdBy).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
      })
    })

    test('commentSection', () => {
      const commentSection = Movie.schema.obj.commentSection
      expect(commentSection).toEqual({
        type: String,
        required: true,
        enum: ['open', 'closed'],
        default: 'open'
      })
    })

    test('ratingCounter', () => {
      const ratingCounter = Movie.schema.obj.ratingCounter
      expect(ratingCounter).toEqual({
        type: Number,
        default: 0
      })
    })

    test('commentCounter', () => {
      const commentCounter = Movie.schema.obj.commentCounter
      expect(commentCounter).toEqual({
        type: Number,
        default: 0
      })
    })
  })
})
