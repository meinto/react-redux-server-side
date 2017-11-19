import '../utils/'
import 'babel-polyfill'
global.regeneratorRuntime = require('regenerator-runtime/runtime')

// for redux observables support
import 'rxjs'
// fetch polyfill for node
import 'isomorphic-fetch'

import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import { createMemoryHistory } from 'history'

import { SSR } from 'redux-observables-server-side-rendering'
import { configureStore } from '../client/config/store'

import {
  wrapAsync,
  createPublicDir,
} from './utils'
import { imageCache } from './cache/image'
import {
  loadHtmlFromCache,
  getFullCacheFileName,
  createCacheDir,
} from './cache/html'
import { processApp } from './processApp'

// set empty window object to emulate the browser window object
global.window = {}

const app = express()

app.locals.pretty = true

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('*.(jpg|jpeg|png|gif)', wrapAsync(imageCache))
app.use(express.static(path.resolve('./dist/static')))
app.use(express.static(path.resolve('./public/static')))


app.use('*', wrapAsync(async(req, res) => {


  const publicDir = createPublicDir()
  const cacheDir = path.resolve(publicDir + '/cache')
  createCacheDir(cacheDir)

  // TODO: refactor this
  let cacheName = ''
  if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
    cacheName = getFullCacheFileName(req, cacheDir)
    if (loadHtmlFromCache(res, cacheName))
      return
  }
  

  // trailing slash prevention
  if (req.originalUrl.slice(-1) == '/' && req.originalUrl.length > 1) {
    res.redirect(301, req.originalUrl.slice(0, -1))
    return
  }

  // react-router-redux ssr
  const history = createMemoryHistory({
    initialEntries: [req.originalUrl],
  })

  const reduxObservablesSSR = new SSR(req.originalUrl)
    .onLoad(store => {
      processApp(store, history, res, req, cacheName)
    })
    .onRedirect((store, { status = 301, redirectUrl }) => {
      res.redirect(status, redirectUrl)
    })
    .onNotFound((store, { status = 404 }) => {
      res.status(status)
      processApp(store, history, res, req, cacheName)
    })

  const store = configureStore({
    router: {
      location: {
        pathname: req.originalUrl,
      },
    },
  }, {
    middlewares: [reduxObservablesSSR.middleware()],
    epicOptions: {
      dependencies: reduxObservablesSSR,
    },
    history,
  })
  
  reduxObservablesSSR.dispatchInitialAction(store)
}))


app.use(function(error, req, res, next) { // eslint-disable-line
  // Gets called because of `wrapAsync()`
  // only gets called when error is thrown
  // res.status(404).json({ message: error.message })
})

app.listen(8080, () => {
  console.log('server is up on port 8080') // eslint-disable-line
})
