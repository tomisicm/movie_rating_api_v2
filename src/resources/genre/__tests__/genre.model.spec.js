import { Genre } from '../genre.model'
import mongoose from 'mongoose'

describe('Item model', () => {
  describe('schema', () => {
    test('name', () => {
      const name = Genre.schema.obj.name
      expect(name).toEqual({
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50
      })
    })

    test('type', () => {
      const type = Genre.schema.obj.type
      expect(type).toEqual(['Literary', 'Film'])
    })

    test('createdBy', () => {
      const createdBy = Genre.schema.obj.createdBy
      expect(createdBy).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
      })
    })
  })
})
