'use strict'

import 'babel-polyfill'
global.regeneratorRuntime = require('regenerator-runtime/runtime')

import 'rxjs'
import './../utils/index'
import 'react-hot-loader/patch'
import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { render } from 'react-dom'
import createHistory from 'history/createBrowserHistory'

import { configureStore } from './config/store'
import App from './App'

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

const history = createHistory()
const store = configureStore(preloadedState, {
  history,
})


function renderWithHotReload(ContentElement) {
  render(
    <AppContainer>
      <ContentElement
        store={store}
        history={history}
      />
    </AppContainer>, document.querySelector('#app')
  )
}

renderWithHotReload(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    const ContentElement = require('./App.js').default
    renderWithHotReload(ContentElement)
  })
}
