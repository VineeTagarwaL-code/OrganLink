import express from 'express'
import { ObjectId } from 'mongoose'
import Organ from '../model/Organ'
import { ApiResponse } from '../types/response.type'
import User from '../model/User'
import { UtilService } from './utils'

interface OrganTypes {
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

type OrganDonationRequest = {
  data: {
    organType: 'heart' | 'lungs' | 'kidney' | 'liver'
    bloodGroup: string
    condition: string
    lat: string
    lng: string
  }
  certification?: string[]
}

type OrganQueryRequest = {
  organType?: string
  bloodGroup?: string
  condition?: string
}

export class OrganService {
  constructor(req: express.Request) {}

  public async register(
    orgRequest: OrganDonationRequest,
    instituteId: string
  ): Promise<ApiResponse> {
    if (
      !(
        orgRequest.data.organType &&
        orgRequest.data.lat &&
        orgRequest.data.lng
      )
    ) {
      return { status: 400, data: { message: 'Bad Request' } }
    }

    const organData = {
      ...orgRequest.data,
      ...orgRequest.certification,
      instituteId,
      isDeleted: false,
    }
    console.log('organ creating... ', organData)
    const createdOrgan = await Organ.create(organData)
    return { status: 200, data: createdOrgan }
  }

  public async filterOrgan(
    distance: boolean,
    organType: string,
    bloodGroup: string,
    id: string
  ) {
    console.log('distance: ')
    const queryObject: OrganQueryRequest = {}

    if (bloodGroup) {
      queryObject.bloodGroup = bloodGroup
    }

    if (organType) {
      queryObject.organType = organType.toLowerCase()
    }
    console.log('queryObject: ', queryObject)

    const response: OrganTypes[] = await Organ.find(queryObject).lean()
    let shortestOrgans

    // find latitude and longitude of current user
    const user = await User.findById(id)

    // return short distance organs
    if (distance && user?.lat && user?.lng) {
      const utilServce = new UtilService()
      shortestOrgans = utilServce.getDistanceFromLatLonInKm(
        user?.lat,
        user?.lng,
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

  public async getAllOrgans() {
    const allOrgans = await Organ.find({ isDeleted: false })
    return { status: 200, data: allOrgans }
  }

  // public async getOrganById(organId: string): Promise<ApiResponse> {
  //   const organ = await Organ.findById(organId)

  //   if (!organ || organ.isDeleted) {
  //     return { status: 400, data: { message: 'Organ not found' } }
  //   }

  //   return { status: 200, data: organ }
  // }

  // public async deleteOrganById(organId: string): Promise<ApiResponse> {
  //   const organ = await Organ.findById(organId)

  //   if (!organ || organ.isDeleted) {
  //     return { status: 400, data: { message: 'Organ not found' } }
  //   }

  //   await Organ.findByIdAndUpdate(organId, {
  //     isDeleted: true,
  //   })

  //   return { status: 200, data: { success: true } }
  // }
}
