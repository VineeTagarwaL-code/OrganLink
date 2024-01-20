import express from 'express'
import Organ from '../model/Organ'
import { ApiResponse } from '../types/response.type'
import User from '../model/User'
import { UtilService } from './utils'
import { OrganType } from '../types/organ.type'

type OrganQueryRequest = {
  organType: string
  lat: number
  lng: number
}

type Organ = {
  organType: string
  lat: number
  lng: number
  isDeleted: boolean
}

export class OrganService {
  constructor(req: express.Request) {}

  public async register(
    orgRequest: OrganQueryRequest,
    instituteId: string
  ): Promise<ApiResponse> {
    if (!(orgRequest.organType && orgRequest.lat && orgRequest.lng)) {
      return { status: 400, data: { message: 'Bad Request' } }
    }

    const organData = {
      ...orgRequest,
      instituteId,
      isDeleted: false,
    }

    const createdOrgan = await Organ.create(organData)
    return { status: 200, data: createdOrgan }
  }

  public async filterOrgan(
    id: string,
    distance?: number,
    organType?: OrganType
  ) {
    const queryObject: { organType?: OrganType } = {}

    if (organType) {
      queryObject.organType = organType
    }

    const response = await Organ.find(queryObject).lean()
    let shortestOrgans

    // find latitude and longitude of current user
    const user = await User.findById(id)

    // return short distance organs
    if (distance && user?.lat && user?.lng) {
      const utilServce = new UtilService()
      shortestOrgans = utilServce.filterOrgansWithinDistance(
        user?.lat,
        user?.lng,
        distance,
        response
      )

      return { status: 200, data: shortestOrgans }
    }
    return { status: 200, data: response }
  }

  public async getOrganByHospitalId(instituteId: string) {
    const hospitalOrgans = await Organ.find({ instituteId, isDeleted: false })
    return { status: 200, data: hospitalOrgans }
  }

  public async getOrganById(organId: string): Promise<ApiResponse> {
    const organ = await Organ.findById(organId)

    if (!organ || organ.isDeleted) {
      return { status: 400, data: { message: 'Organ not found' } }
    }

    return { status: 200, data: organ }
  }

  public async getAllOrgans() {
    const allOrgans = await Organ.find({ isDeleted: false })
    console.log('all organs: --------------------------> ', allOrgans)
    return { status: 200, data: allOrgans }
  }
}
