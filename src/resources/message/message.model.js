import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

const messageSchema = new mongoose.Schema(
  {
    message: {
      body: { type: String, required: true, trim: true }
    },
    recievers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
      }
    ],
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    }
  },
  {
    timestamps: true
  }
)

messageSchema.plugin(mongoosePaginate)
exports.Message = mongoose.model('message', messageSchema)
