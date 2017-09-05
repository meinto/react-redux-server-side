import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'

import { routes } from './config/routes'


class ClientApp extends Component {
  static propTypes = {
    routes: PropTypes.array,
  }

  render() {
    return (
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    )
  }
}

export default ClientApp
