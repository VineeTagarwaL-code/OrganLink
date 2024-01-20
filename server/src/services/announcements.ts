import Announcement from '../model/Announcement'
import User from '../model/User'
import { ApiResponse } from '../types/response.type'

interface Announcement {
  from: string
  text: string
}

export class AnnouncementService {
  constructor() {}

  public async createAnnouncement(
    announcementReq: Announcement
  ): Promise<ApiResponse> {
    console.log('check 1')
    if (!(announcementReq.from && announcementReq.text)) {
      return { status: 400, data: { message: 'Bad request' } }
    }

    const user = await User.findById(announcementReq.from)
    const announcement = await Announcement.create({
      ...announcementReq,
      contact: user?.contact,
      email: user?.email,
    })
    console.log('Announcement crated successfully')

    return { status: 200, data: { message: 'Announcement created' } }
  }

  public async getAnnouncements(): Promise<ApiResponse> {
    const allAnnouncements = await Announcement.find({}).sort({ timeStamp: -1 })
    return { status: 200, data: allAnnouncements }
  }
}
