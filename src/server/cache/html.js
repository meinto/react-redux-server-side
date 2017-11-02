import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

export const getFullCacheFileName = (req, cacheDir) => {
  return path.resolve(cacheDir + '/' + crypto.createHash('md5').update(req.originalUrl).digest('hex') + '.html')
}

export const loadHtmlFromCache = (res, cacheName) => {
  if (fs.existsSync(cacheName)) {
    // console.log('load html from cache')
    // console.log(cacheName)
    res.sendFile(cacheName)
    return true
  }
  return false
}

export const createCacheDir = cacheDir => {
  try {
    fs.mkdirSync(cacheDir)
  } catch (err) {
    if (err.code !== 'EEXIST')
      console.log('cache dir already exists') // eslint-disable-line
  }
}
