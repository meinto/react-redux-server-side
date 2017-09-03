import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import React from 'react'
import { renderToString } from 'react-dom/server'

import StaticRouter from 'react-router-dom/StaticRouter'
import { renderRoutes } from 'react-router-config'

import { routes } from './../client/config/routes'

const app = express()

app.locals.pretty = true

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.get('*', (req, res) => {
  const context = {}

  const content = renderToString(
    <StaticRouter location={req.url} context={context}>
      {renderRoutes(routes)}
    </StaticRouter>
  )
  
  res.send(content)
})

app.listen(3000, () => {
  console.log('server is up on port 3000')
})
