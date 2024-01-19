import nodemailer from 'nodemailer'
import { EmailConfig } from '../config/appConfig'

import { ObjectId } from 'mongoose'

export interface OrganTypes {
  _id: ObjectId
  organType: string
  instituteId: ObjectId
  bloodGroup: string
  condition: string
  certification: any[]
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

  public getDistanceFromLatLonInKm(
    lat1: number,
    lng1: number,
    filterOrgans: OrganTypes[]
  ) {
    const organsWithDistances = filterOrgans.map(organ => {
      const organDistance = this.calculation(lat1, lng1, organ.lat, organ.lng)
      return { ...organ, distance: organDistance }
    })
  
    // Sort organs based on distances in ascending order
    const sortedOrgans = organsWithDistances.sort(
      (a, b) => a.distance - b.distance
    )
    sortedOrgans.map(organ => console.log(organ.distance))

    // Return the sorted organs array
    return sortedOrgans
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
