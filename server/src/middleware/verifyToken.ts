import express from 'express'
import jwt from 'jsonwebtoken'
import { JwtConfig } from '../config/appConfig'
import { JwtPayload } from 'jsonwebtoken'

export const verifyToken = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const token = req.header('x-access-token')?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token is missing',
      })
    }

    const decoded = <JwtPayload>jwt.verify(token, JwtConfig.key)
    console.log(decoded)
    res.locals.user = { id: decoded }
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      success: false,
      message: 'Token is invalid',
    })
  }
}
