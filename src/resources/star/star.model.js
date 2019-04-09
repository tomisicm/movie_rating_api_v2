import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'
// import Joi from 'joi'

const starSchema = new mongoose.Schema(
  {
    name: {
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
    },
    dateOfBirth: Date,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    }
  },

  {
    toObject: {
      virtuals: true,
      transform: function(doc, ret) {
        delete ret.createdBy
        delete ret.__v
        delete ret._id
      }
    },
    toJSON: {
      virtuals: true,
      transform: function(doc, ret) {
        delete ret.createdBy
        delete ret.__v
        delete ret._id
      }
    }
  }
)

starSchema.virtual('fullname').get(function() {
  return [this.name.first, this.name.last].filter(Boolean).join(' ')
})

starSchema.plugin(mongoosePaginate)

exports.Star = mongoose.model('star', starSchema)
