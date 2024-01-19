import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
  {
    name: String,
    password: String,
    role: String,
    contact: Number,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    state: String,
    city: String,
    zipCode: String,
    isVerified: Boolean,
    isDeleted: Boolean,
    lat: Number,
    lng: Number,
    nabh:String
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

export default User
