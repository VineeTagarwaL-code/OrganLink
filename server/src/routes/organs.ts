import express from 'express'
import User from '../model/User'
import { OrganService } from '../services/organ'

const router = express.Router()

const isVerifiedInstitute = async (
  req: express.Request, // Add decodedToken to the request type
  res: express.Response,
  next: express.NextFunction
) => {
  const user = await User.findById(res.locals.user.id)
  if (!user || user.role !== 'institution') {
    return res.status(404).send({ message: 'user not found' })
  }

  if (!user.isVerified) {
    return res
      .status(401)
      .send({ message: 'You have not verified yet please wait' })
  }
  next()
}

router.get(
  '/one/:id',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const organService = new OrganService(req)
      const organId = req.params.id
      const organDonationResponse = await organService.getOrganById(organId)
      res.status(organDonationResponse.status).send(organDonationResponse.data)
    } catch (err) {
      return next(err)
    }
  }
)

router.post(
  '/',
  isVerifiedInstitute,
  async (
    req: express.Request, // Add decodedToken to the request type
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const organService = new OrganService(req)
      const organDonationResponse = await organService.register(
        req.body,
        res.locals.user.id
      )
      res.status(organDonationResponse.status).send(organDonationResponse.data)
    } catch (err) {
      return next(err)
    }
  }
)

router.get(
  '/hospital',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const organService = new OrganService(req)
      const organDonationResponse = await organService.getOrganByHospitalId(
        res.locals.user.id
      )
      res.status(organDonationResponse.status).send(organDonationResponse.data)
    } catch (err) {
      return next(err)
    }
  }
)

router.get(
  '/all',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const organService = new OrganService(req)
      console.log('Before organ donation:--------------------> ')
      const organDonationResponse = await organService.getAllOrgans()
      res.status(organDonationResponse.status).send(organDonationResponse.data)
    } catch (err) {
      return next(err)
    }
  }
)


router.post(
  '/filter',
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const organService = new OrganService(req)
      const response = await organService.filterOrgan(
        res.locals.user.id,
        req.body.distance,
        req.body.organType
      )
      if (!response) {
        console.log('Organ can not fetch according filters')
      }
      res.status(200).send(response.data)
    } catch (err) {
      return next(err)
    }
  }
)

export const organRouter = router
