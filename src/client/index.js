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

const history = createHistory()
const store = configureStore({}, {
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
