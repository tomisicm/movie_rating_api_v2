import { Star } from '../star.model'
import mongoose from 'mongoose'

describe('Item model', () => {
  describe('schema', () => {
    test('name', () => {
      const name = Star.schema.obj.name
      expect(name).toEqual({
        first: {
          type: String,
          required: true,
          trim: true,
          minlength: 2,
          maxlength: 50
        },
        last: {
          type: String,
          required: true,
          trim: true,
          minlength: 2,
          maxlength: 50
        }
      })
    })

    test('createdBy', () => {
      const createdBy = Star.schema.obj.createdBy
      expect(createdBy).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
      })
    })

    test('dateOfBirth', () => {
      const dateOfBirth = Star.schema.obj.dateOfBirth
      expect(dateOfBirth).toBe(Date)
    })
  })
})
