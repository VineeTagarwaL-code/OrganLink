import { Role } from '../types/role.enum'
import { ApiResponse } from '../types/response.type'
import User from '../model/User'

export class AdminService {
  constructor() {}

  async getRequests(): Promise<ApiResponse> {
    const unverifiedUsers = await User.find({
      role: Role.Institution,
      isVerified: false,
      isDeleted: false,
    })

    return { status: 200, data: unverifiedUsers }
  }
  async verifyRequests(ids: string[]): Promise<ApiResponse> {
    console.log("id" , ids)
    try {
      const result = await User.updateMany(
        {
          _id: { $in: ids },
          isDeleted: false,
          role: Role.Institution,
          isVerified: false,
        },
        { $set: { isVerified: true } }
      );

      console.log(result);

      return { status: 200, data: 'updated successfully' };
    } catch (error) {
      console.error('Error updating documents:', error);
      return { status: 500, data: 'update failed' };
    }
  }
}
