import mongoose, { Schema } from 'mongoose'

const organSchema = new Schema(
  {
    organType: {
      type: String,
      required: true,
    },
    instituteId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    isDeleted: {
      type: Boolean,
    },
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Organ = mongoose.model('Organ', organSchema)

export default Organ
