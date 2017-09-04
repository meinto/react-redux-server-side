import './../utils/index'
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'

import rootReducer from './modules/root/index'
import { routes } from './config/routes'

const store = createStore(rootReducer)

class ClientApp extends Component {

  static propTypes = {
    routes: PropTypes.array,
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          {renderRoutes(routes)}
        </BrowserRouter>
      </Provider>
    )
  }
}

render(<ClientApp />, document.querySelector('#app'))
