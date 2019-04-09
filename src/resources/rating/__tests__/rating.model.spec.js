import { Rating } from '../rating.model'
import mongoose from 'mongoose'

describe('Rating model', () => {
  describe('schema', () => {
    test('item', () => {
      const item = Rating.schema.obj.item
      expect(item).toEqual({
        type: mongoose.Types.ObjectId,
        required: true
      })
    })
    test('itemType', () => {
      const itemType = Rating.schema.obj.itemType
      expect(itemType).toEqual({
        type: String,
        enum: ['film', 'book', 'video'],
        default: 'open'
      })
    })

    test('value', () => {
      const value = Rating.schema.obj.value
      expect(value).toEqual({
        type: Number,
        default: 0,
        trim: true,
        max: 5,
        min: 0
      })
    })

    test('createdBy', () => {
      const createdBy = Rating.schema.obj.createdBy
      expect(createdBy).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
      })
    })
  })
})
