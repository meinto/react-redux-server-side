import './../utils/index'
import 'react-hot-loader/patch'
import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import ClientApp from './ClientApp'
import rootReducer from './modules/root/index'
const store = createStore(rootReducer)


function renderWithHotReload(RootElement) {
  render(
    <AppContainer>
      <Provider store={store}>
        <RootElement />
      </Provider>
    </AppContainer>
    , document.querySelector('#app')
  )
}

renderWithHotReload(ClientApp)

if (module.hot) {
  module.hot.accept('./ClientApp', () => {
    const NextRoot = require('./ClientApp.js').default
    renderWithHotReload(NextRoot)
  })
}
