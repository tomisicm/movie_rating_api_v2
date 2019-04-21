import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'
import Joi from 'joi'

const ratingSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Types.ObjectId,
      required: true
    },
    itemType: {
      type: String,
      // required: true,
      enum: ['film', 'book', 'video'],
      default: 'film'
    },
    value: {
      type: Number,
      default: 0,
      trim: true,
      max: 5,
      min: 0
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    }
  },
  { timestamps: true }
)

/* movieSchema.virtual('star', {
  ref: 'star',
  localField: 'stars',
  foreignField: 'fullname',
  justOne: false
}) */

ratingSchema.plugin(mongoosePaginate)

function validateRating(rating) {
  const schema = {
    item: Joi.ObjectId().required(),
    description: Joi.string()
      .trim()
      .max(255),
    value: Joi.number(),
    createdBy: Joi.objectId()
  }
  return Joi.validate(rating, schema)
}

ratingSchema.index({ item: 1, createdBy: 1 }, { unique: true })

const Rating = mongoose.model('rating', ratingSchema)

exports.validateRating = validateRating
exports.Rating = Rating
