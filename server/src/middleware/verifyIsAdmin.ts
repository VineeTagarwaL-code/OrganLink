import express from 'express'
import dotenv from 'dotenv'
import { Role } from '../types/role.enum'
import User from '../model/User'

dotenv.config()

export const verifyIsAdmin = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const userDetails = await User.findById(res.locals.user.id)
    console.log(userDetails)
    if (!(userDetails && userDetails.role === Role.Admin)) {
      console.log('check check 000003')
      return res.status(401).json({
        success: false,
        message: 'Not authorised to perform this action',
      })
    }
    next()
  } catch (error) {
    console.log('check check 000004')
    return res.status(401).json({
      success: false,
      message: 'Something went wrong while validating the user role',
    })
  }
}