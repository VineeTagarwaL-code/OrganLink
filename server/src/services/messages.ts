import Message from '../model/Message'
import { ApiResponse } from '../types/response.type'

type Message = {
  text: string
  attachment: string
}

export class MessageService {
  constructor() {}

  async sendMessage(message: {
    to: string
    from: string
    organId: string
    text?: string
    attachment?: string
  }): Promise<ApiResponse> {
    const { to, from, organId, text, attachment } = message

    if (!(to && from && organId)) {
      return { status: 400, data: { message: 'Bad request' } }
    }

    if (!(text || attachment)) {
      return { status: 400, data: { message: 'Bad request' } }
    }

    await Message.create(message)
    return { status: 200, data: { message: 'Messsage sent successfully' } }
  }

  async getMessagesForOrganForIndividual(
    organId: string,
    individualId: string
  ): Promise<ApiResponse> {
    const messagesForOrganForIndividual = await Message.find({
      organId,
      $or: [{ from: individualId }, { to: individualId }],
    }).sort({ timestamp: -1 })

    return { status: 200, data: messagesForOrganForIndividual }
  }

  async getUsersWhoSentMessages(organId: string): Promise<ApiResponse> {
    const distinctUsers = await Message.find({ organId })
      .distinct('from')
      .sort({ timestamp: -1 })
    return { status: 200, data: distinctUsers }
  }
}
