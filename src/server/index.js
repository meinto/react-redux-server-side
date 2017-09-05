import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import React from 'react'
import { renderToString } from 'react-dom/server'

import ServerApp from './ServerApp'
import Head from './Head'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './../client/modules/root/index'

const app = express()

app.locals.pretty = true

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(express.static(path.resolve('./dist/static')))


app.use('*', (req, res) => {
  const context = {}

  const store = createStore(rootReducer)

  const ContentComponent = renderToString(
    <Provider store={store}>
      <ServerApp
        location={req.originalUrl}
        context={context}
      />
    </Provider>
  )

  // Grab the initial state from our Redux store
  const preloadedState = store.getState()

  const HeadComponent = renderToString(
    <Head
      title={'test title'} // later grabbed from preloaded state
    />
  )
  
  res.send(renderFullPage(ContentComponent, HeadComponent, preloadedState))
})

function renderFullPage(ContentComponent, HeadComponent, preloadedState = {}) {
  return `
    <!doctype html>
    <html>
      ${HeadComponent}
      <body>
        <div id="app">${ContentComponent}</div>
      </body>
    </html>
    <script src="/client.js"></script>
    <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>
    `
}


app.listen(8080, () => {
  console.log('server is up on port 8080')
})
