import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import React from 'react'
import { renderToString } from 'react-dom/server'

import ServerApp from './ServerApp'

const app = express()

app.locals.pretty = true

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(express.static(__dirname + '/public'))

// dont know how to do this better :/
app.use('/client.js', (req, res) => {
  const pathToClientJS = path.resolve('./dist/client.js')
  res.sendFile(pathToClientJS)
})


app.use('*', (req, res) => {
  let context = {} // eslint-disable-line

  const content = renderToString(
    <ServerApp
      location={req.originalUrl}
      context={context}
    />
  )
  
  res.send(renderFullPage(content))
})

function renderFullPage(html, preloadedState = {}) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/client.js"></script>
      </body>
    </html>
    `
}

app.listen(3000, () => {
  console.log('server is up on port 3000')
})
