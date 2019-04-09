import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'
// import Joi from 'joi'

const genreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 50
    },
    type: ['Literary', 'Film'],
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    }
  },
  {
    toObject: {
      transform: function(doc, ret) {
        delete ret.createdBy
        delete ret.createdAt
        delete ret.updatedAt
        delete ret.__v
      }
    },
    toJSON: {
      transform: function(doc, ret) {
        delete ret.createdBy
        delete ret.createdAt
        delete ret.updatedAt
        delete ret.__v
      }
    }
  }
)

/*  genre uses generic controller
function validateGenre(user) {
  // Joi schema
  const schema = {
    email: Joi.string()
      .required()
      .trim()
      .min(3)
      .max(50)
      .required()
  }
  return Joi.validate(user, schema)
} 

exports.validateGenre = validateGenre
*/
genreSchema.plugin(mongoosePaginate)
exports.Genre = mongoose.model('genre', genreSchema)
