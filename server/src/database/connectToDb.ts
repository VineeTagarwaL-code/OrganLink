import mongoose from 'mongoose'
import { Mongo } from '../config/appConfig'

export async function connectToDb() {
  mongoose.connect(Mongo.url).then(() => {
    console.log('Connection to Db was Successfull !')
  })
}
