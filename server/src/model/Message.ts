import mongoose, { Schema } from 'mongoose'

const messageSchema = new Schema(
  {
    text: String,
    attachment: String,
    to: String,
    from: String,
    organId: String,
  },
  {
    timestamps: true,
  }
)

const Message = mongoose.model('Message', messageSchema)

export default Message
