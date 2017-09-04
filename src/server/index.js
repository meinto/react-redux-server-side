import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import React from 'react'
import { renderToString } from 'react-dom/server'

import ServerApp from './ServerApp'

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './../client/modules/root/index'

const app = express()

app.locals.pretty = true

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(express.static(path.resolve('./dist/assets')))


app.use('*', (req, res) => {
  const context = {}

  const store = createStore(rootReducer)

  const content = renderToString(
    <Provider store={store}>
      <ServerApp
        location={req.originalUrl}
        context={context}
      />
    </Provider>
  )

  // Grab the initial state from our Redux store
  const preloadedState = store.getState()
  
  res.send(renderFullPage(content, preloadedState))
})

function renderFullPage(html, preloadedState = {}) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React Redux Server Side Example</title>
        <link rel="stylesheet" href="/css/foundation.min.css">
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/js/client.js"></script>
      </body>
    </html>
    `
}

app.listen(3000, () => {
  console.log('server is up on port 3000')
})
