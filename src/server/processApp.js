import React from 'react'
import { renderToString } from 'react-dom/server'
import { JssProvider, SheetsRegistry } from 'react-jss'
import { ServerStyleSheet } from 'styled-components'
import { Helmet } from 'react-helmet'

import App from '../client/App'

export const processApp = (store, history, res, req, cacheName) => {

  const context = {}

  const sheets = new SheetsRegistry() // deprecated
  const sheet = new ServerStyleSheet()

  // Grab the initial state from our Redux store
  const preloadedState = store.getState()

  const ContentComponent = renderToString(
    sheet.collectStyles(
      <JssProvider registry={sheets}>
        <App
          store={store}
          location={req.originalUrl}
          context={context}
          history={history}
        />
      </JssProvider>
    )
  )
  
  const helmet = Helmet.renderStatic()
  const styleTags = sheet.getStyleTags()

  const html = renderFullPage(ContentComponent, preloadedState, sheets, styleTags, helmet)

  var fs = require('fs')
  fs.writeFile(cacheName, html, function(err) {
    if (err) {
      return console.log(err) // eslint-disable-line
    }

    console.log('The file was saved!') // eslint-disable-line
  })
  
  res.send(html)
}

function renderFullPage(ContentComponent, preloadedState = {}, sheets = {}, styleTags = '', helmet = {}) {
  return `
    <!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()} 
        ${helmet.link.toString()}
        ${helmet.script.toString()}
        <style type="text/css">
          ${sheets.toString()}
        </style>
        ${styleTags}
      </head>
      <body ${helmet.bodyAttributes.toString()}>
        <div id="app">${ContentComponent}</div>
      </body>
    </html>
    <script>window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}</script>
    <script src="/client.js"></script>
    `
}
