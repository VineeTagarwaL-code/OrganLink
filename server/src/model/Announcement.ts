import mongoose, { Schema } from 'mongoose'

const announcementSchema = new Schema(
  {
    text: String,
    from: String,
    contact: Number,
    email: String,
  },
  {
    timestamps: true,
  }
)

const Announcement = mongoose.model('Announcement', announcementSchema)

export default Announcement
