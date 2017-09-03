import './../utils/index'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'
import {
  StaticRouter,
} from 'react-router-dom'

import { routes } from './config/routes'

class ServerApp extends PureComponent {

  static propTypes = {
    location: PropTypes.string,
    context: PropTypes.context,
  }

  render() {
    return (
      <StaticRouter location={this.props.location} context={this.props.context}>
        {renderRoutes(routes)}
      </StaticRouter>
    )
  }
}

export default ServerApp
