import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'
import Joi from 'joi'

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 50
    },
    description: {
      type: String,
      default: null,
      trim: true,
      maxlength: 1000
    },
    genres: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'genre',
        required: true
      }
    ],
    stars: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'star',
        required: true
      }
    ],
    releaseYear: Date,
    avatar: {
      type: String,
      default: null
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    },
    commentSection: {
      type: String,
      required: true,
      enum: ['open', 'closed'],
      default: 'open'
    },
    // fields given below should be protected
    // eather by parsing request or is there other way?
    ratingCounter: {
      type: Number,
      default: 0
    },
    commentCounter: {
      type: Number,
      default: 0
    }
  },
  {
    toObject: {
      virtuals: true,
      transform: function(doc, ret) {
        delete ret.createdBy._id
      }
    },
    toJSON: {
      virtuals: true,
      transform: function(doc, ret) {
        delete ret.createdBy._id
      }
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

movieSchema.plugin(mongoosePaginate)

// generalizovati tako sto
// preimenovati funkcioju u "validate". nakalemiti ovu funkciju na shemu i onda u kontroleru zvati validate
function validateMovie(user) {
  const schema = {
    title: Joi.string()
      .required()
      .trim()
      .min(3)
      .max(50)
      .required(),
    description: Joi.string()
      .trim()
      .max(255),
    genres: Joi.array(),
    stars: Joi.array(),
    release_year: Joi.date(),
    avatar: Joi.string(),
    commentSection: Joi.string().required(),
    createdBy: Joi.objectId()
  }
  return Joi.validate(user, schema)
}

exports.validateMovie = validateMovie
exports.Movie = mongoose.model('movie', movieSchema)
