import User from '../model/User'

export class DashboardUserService {
  constructor() {}

  public async getUserDetails(userId: string) {
    const res = await User.findById(userId)
    if (!res) {
      return { status: 404, data: { message: 'User not found' } }
    }

    return { status: 200, data: res }
  }

  public async getAllUsers(userIds: string[]) {
    const res = await User.find({ _id: { $in: userIds } })
    if (!res) {
      return { status: 404, data: { message: 'User not found' } }
    }

    return { status: 200, data: res }
  }
}
