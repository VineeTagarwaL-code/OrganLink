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
    bloodGroup: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
    certification: {
      type: [String],
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
