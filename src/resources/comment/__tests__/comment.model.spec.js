import { Comment } from '../comment.model'
import mongoose from 'mongoose'

describe('Item model', () => {
  describe('schema', () => {
    test('comment', () => {
      const comment = Comment.schema.obj.body
      expect(comment).toEqual({
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
      })
    })
    test('createdBy', () => {
      const createdBy = Comment.schema.obj.createdBy
      expect(createdBy).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
      })
    })
    test('item', () => {
      const item = Comment.schema.obj.item
      expect(item).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        required: true
      })
    })
    test('itemType', () => {
      const itemType = Comment.schema.obj.itemType
      expect(itemType).toEqual({
        type: String,
        enum: ['film', 'book', 'video'],
        default: 'film'
      })
    })
    test('replay to', () => {
      const replayTo = Comment.schema.obj.replayTo
      expect(replayTo).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'comment',
        default: null
      })
    })
  })
})
