import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

const listSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    description: String,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    }
  },
  { timestamps: true }
)

listSchema.plugin(mongoosePaginate)

// listSchema.index({ user: 1, name: 1 }, { unique: true })

export const List = mongoose.model('list', listSchema)
