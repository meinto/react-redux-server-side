import '../utils'
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

import React from 'react'
import { renderToString } from 'react-dom/server'

import SSR from './dependencies/SSR'
import App from '../client/App'
import { configureStore } from '../client/config/store'

const app = express()

app.locals.pretty = true

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(express.static(path.resolve('./dist/static')))


app.use('*', async(req, res) => {
  const context = {}

  const reduxObservablesSSR = new SSR(req.originalUrl)

  const store = configureStore({}, {
    middlewares: [reduxObservablesSSR.middleware()],
    epicOptions: {
      dependencies: reduxObservablesSSR,
    },
  })
  
  reduxObservablesSSR.dispatchEpicActions(store)

  await reduxObservablesSSR.loadingComplete()

  const ContentComponent = renderToString(
    <App
      store={store}
      isClient={false}
      location={req.originalUrl}
      context={context}
    />
  )

  // Grab the initial state from our Redux store
  const preloadedState = store.getState()
    
  res.send(renderFullPage(ContentComponent, preloadedState))
})

function renderFullPage(ContentComponent, preloadedState = {}) {
  return `
    <!doctype html>
    <html>
      <head></head>
      <body>
        <div id="app">${ContentComponent}</div>
      </body>
    </html>
    <script src="/client.js"></script>
    <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>
    `
}


app.listen(8080, () => {
  console.log('server is up on port 8080') // eslint-disable-line
})
