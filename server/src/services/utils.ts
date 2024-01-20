import nodemailer from 'nodemailer'
import { v2 as cloudinary } from 'cloudinary'
import { EmailConfig, cloudinaryConfig } from '../config/appConfig'

import { ObjectId } from 'mongoose'

export interface OrganTypes {
  _id: ObjectId
  organType: string
  instituteId: ObjectId
  isDeleted: boolean
  lat: number
  lng: number
  createdAt: string
  updatedAt: string
  __v: number
  distance?: number
}

export class UtilService {
  constructor() {}

  async sendEmail(email: string, randomPass: string) {
    const emailOptions = {
      from: EmailConfig.user,
      to: email,
      subject: `Welcome to Organ Donation Portal`,
      text: `Your credentials are: \n Username: ${email} \n Password: ${randomPass}`,
    }
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: EmailConfig.user,
        pass: EmailConfig.pass,
      },
    })

    transporter.sendMail(emailOptions).then(() => {
      console.log('email sent')
      return
    })
  }

  public filterOrgansWithinDistance(
    userLat: number,
    userLng: number,
    distance: number,
    allOrgans: any
  ) {
    const organsWithInDistance = []

    for (let i = 0; i < allOrgans.length; i++) {
      const orgDistance = this.calculation(
        allOrgans[i].lat,
        allOrgans[i].lng,
        userLat,
        userLng
      )

      if (orgDistance <= distance) {
        organsWithInDistance.push({ ...allOrgans[i], distance: orgDistance })
      }
    }

    // Sort organs based on distances in ascending order
    const sortedOrgans = organsWithInDistance.sort(
      (a, b) => a.distance - b.distance
    )

    return sortedOrgans
  }

  public cloudinaryConnec() {
    try {
      cloudinary.config({
        cloud_name: cloudinaryConfig.cloudName,
        api_key: cloudinaryConfig.key,
        api_secret: cloudinaryConfig.secret,
      })
    } catch (error) {
      console.log('Cloudinary connect issue:----------------> ', error)
    }
  }

  private calculation(lat1: number, lon1: number, lat2: number, lon2: number) {
    var R = 6371 // km
    var dLat = this.toRad(lat2 - lat1)
    var dLon = this.toRad(lon2 - lon1)
    var lat1 = this.toRad(lat1)
    var lat2 = this.toRad(lat2)

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    var d = R * c
    return Math.floor(d)
  }

  private toRad(deg: number) {
    return deg * (Math.PI / 180)
  }
}
