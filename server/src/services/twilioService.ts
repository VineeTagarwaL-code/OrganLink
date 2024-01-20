import { thresholdRadiusForMessage, twilioConfig } from '../config/appConfig'
import User from '../model/User'
import { UtilService } from './utils'
import twilio, { Twilio } from 'twilio'

export class TwilioService {
  private twilioClient: Twilio

  constructor() {
    const accountSid = twilioConfig.username
    const authToken = twilioConfig.password
    this.twilioClient = twilio(twilioConfig.username, twilioConfig.password)
  }

  async sendSmsToNearbyUsers(userId: string, text: string) {
    try {
      const currentUser = await User.findById(userId)
      const lat = currentUser && currentUser.lat
      const lng = currentUser && currentUser.lng
      if (lat && lng) {
        const utilService = new UtilService()
        const boundingBox = utilService.getBoundingBox(
          lat,
          lng,
          Number(thresholdRadiusForMessage)
        )

        const query = {
          $and: [
            { lat: { $gte: boundingBox.minLat, $lte: boundingBox.maxLat } },
            { lng: { $gte: boundingBox.minLon, $lte: boundingBox.maxLon } },
          ],
        }

        const usersDetails = await User.find(query)
          .select({ _id: 0, contact: 1, email: 1 })
          .exec()

        console.log(usersDetails)

        const smsPromises = usersDetails.map(user =>
          this.sendSms('+91' + String(user.contact), text)
        )

        const results = await Promise.all(smsPromises)
        console.log('SMS messages sent successfully:', results)
      }
    } catch (err) {
      console.error('Error sending SMS messages:', err)
      return
    }
  }

  sendSms(to: string, body: string) {
    return this.twilioClient.messages.create({
      body,
      to,
      from: twilioConfig.number,
    })
  }
}
