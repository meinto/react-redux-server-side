import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

export const sendImageToBrowser = (imagePath, res) => {
  const inputStream = fs.createReadStream(imagePath)
  inputStream
    .pipe(res)
}

export const saveResizedImageInCache = (resizedImageStream, cacheImagePath) => {
  resizedImageStream.toFile(cacheImagePath)
}

export const resizeImage = (imagePath, width, height) => {
  let resizedImageStream = fs.createReadStream(imagePath)

  let resizer = null
  if (width !== null)
    resizer = sharp().resize(width, height)

  if (resizer)
    resizedImageStream = resizedImageStream.pipe(resizer)

  return resizedImageStream
}

export const extractDimensions = req => {
  const dimension = req.query.dim
  let width = null
  let height = null
  if (dimension) {
    if (dimension.split('x').length > 1) {
      width = parseInt(dimension.split('x').shift())
      height = parseInt(dimension.split('x').pop())
    } else {
      width = parseInt(dimension.split('x').pop())
    }
  }

  return { width, height }
}

// TODO: multiple lookup dirs
const rawImageDir = path.resolve('./public')
const cacheDir = path.resolve('./public/cache')
export const imageCache = async(req, res) => {
  const relativeImagePath = req.originalUrl.split('?').shift()
  const fullImagePath = path.resolve(rawImageDir + relativeImagePath)
  const imageExtension = path.extname(relativeImagePath)

  const { width, height } = extractDimensions(req)

  if (width) {
    const cacheName = crypto.createHash('md5').update(req.originalUrl).digest('hex')

    try {
      fs.mkdirSync(cacheDir)
    } catch (err) {
      if (err.code !== 'EEXIST')
        console.log('cache dir already exists') // eslint-disable-line
    }

    const cacheImagePath = cacheDir + '/' + cacheName + imageExtension
  
    if (fs.existsSync(cacheImagePath)) {
      sendImageToBrowser(cacheImagePath, res)
    } else {
      const resizedImageStream = resizeImage(fullImagePath, width, height)
      saveResizedImageInCache(resizedImageStream, cacheImagePath)
      sendImageToBrowser(fullImagePath, res)
    }
  } else {
    sendImageToBrowser(fullImagePath, res)
  }

}
