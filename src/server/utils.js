import path from 'path'
import fs from 'fs'

export const wrapAsync = fn => {
  return (req, res, next) => {
    // Make sure to `.catch()` any errors and pass them along to the `next()`
    // middleware in the chain, in this case the error handler.
    fn(req, res, next).catch(next)
  }
}

// TODO: config file for this
const standardPublicDir = path.resolve('./public')
export const createPublicDir = (publicDir = standardPublicDir) => {
  try {
    fs.mkdirSync(publicDir)
  } catch (err) {
    if (err.code !== 'EEXIST')
      console.log('publicDir dir already exists') // eslint-disable-line
  }
  return publicDir
}

export const getPublicDir = () => {
  return standardPublicDir
}
