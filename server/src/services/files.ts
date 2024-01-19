import fs from 'fs'
import multer from 'multer'
import express from 'express'
import { v2 as cloudinary } from 'cloudinary'
import { UtilService } from './utils'
export class FileService {
  private upload: multer.Multer

  constructor() {
    //cloudinary connect
    const utilService = new UtilService()
    utilService.cloudinaryConnec()

    const storage = multer.diskStorage({
      destination: function (req: express.Request, file: any, cb: any) {
        cb(null, './src/uploads/')
      },
      filename: function (req: express.Request, file: any, cb: any) {
        cb(null, file.originalname)
      },
    })

    this.upload = multer({ storage: storage })
  }

  async uploadFiles(req: express.Request, res: express.Response) {
    try {
      this.upload.array('file', 3)(req, res, async (err: any) => {
        if (err) {
          console.log('Multer error:----------------> ', err)
          return res.status(500).send({ error: 'Error during file upload' })
        }

        const files = req.files as Express.Multer.File[]

        if (!files || files.length === 0) {
          return res.status(400).send({ error: 'No files were uploaded.' })
        }

        const uploadPromises = files.map(async (file: Express.Multer.File) => {
          try {
            const response = await cloudinary.uploader.upload(file.path, {
              resource_type: 'auto',
            })

            // Remove the file from the local storage
            fs.unlinkSync(file.path)

            if (response && response.secure_url) {
              return { url: response.secure_url }
            }
          } catch (err) {
            throw err
          }
        })

        const results = await Promise.all(uploadPromises)

        res.status(200).send({ data: results })
      })
    } catch (err) {
      console.error(err)
      res.status(500).send({ error: 'Internal Server Error' })
    }
  }
}
