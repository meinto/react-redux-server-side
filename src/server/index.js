import express from 'express'

import React from 'react'
import { renderToString } from 'react-dom/server'

import StaticRouter from 'react-router-dom/StaticRouter'
import { renderRoutes } from 'react-router-config'

import { routes } from './../client/config/routes'

const router = express.Router()

router.get('*', (req, res) => {
  const context = {}

  const content = renderToString(
    <StaticRouter location={req.url} context={context}>
      {renderRoutes(routes)}
    </StaticRouter>
  )

  console.log(content)

  res.render('index', {
    title: 'Bla',
    data: false,
    content,
  })
})

export { router }
