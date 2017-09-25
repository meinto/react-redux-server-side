import React, { Component } from 'react'
import { StaticRouter } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'

import { routes } from './config/routes'
import Header from './components/Header'


class ClientApp extends Component {
  static propTypes = {
    isClient: PropTypes.bool,
    location: PropTypes.string,
    context: PropTypes.object,
    store: PropTypes.object,
    history: PropTypes.object,
  }

  static defaultProps = {
    isClient: true,
    location: '',
    context: {},
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          <Header />
          {this.props.isClient && (
            <ConnectedRouter history={this.props.history}>
              {renderRoutes(routes)}
            </ConnectedRouter>
          )}

          {!this.props.isClient && (
            <StaticRouter location={this.props.location} context={this.props.context}>
              {renderRoutes(routes)}
            </StaticRouter>
          )}
        </div>
      </Provider>
    )
  }
}

export default ClientApp
