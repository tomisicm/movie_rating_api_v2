import mongoose from 'mongoose'

const threadSchema = new mongoose.Schema(
  {
    // this will tie thread to the movie
    movieId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'movie',
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: ['open', 'closed'],
      default: 'open'
    },
    // collection of comment
    comments: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'comment'
      }
    ]
  },
  { timestamps: true }
)

// itemSchema.index({ list: 1, name: 1 }, { unique: true })

export const Thread = mongoose.model('thread', threadSchema)
