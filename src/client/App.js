import React, { Component } from 'react'
import { ConnectedRouter } from 'react-router-redux'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import ga from 'react-google-analytics'

import { routes } from './config/routes'
import Header from './components/Header'

const GAInitiailizer = ga.Initializer


class ClientApp extends Component {
  static propTypes = {
    location: PropTypes.string,
    context: PropTypes.object,
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  static defaultProps = {
    location: '',
    context: {},
  }

  render() {
    const routerProps = {
      history: this.props.history,
    }

    if (this.props.location.length > 0)
      routerProps.location = this.props.location

    return (
      <Provider store={this.props.store}>
        <div>
          <ConnectedRouter {...routerProps}>
            <div>
              <GAInitiailizer />
              <Header />
              {renderRoutes(routes)}
            </div>
          </ConnectedRouter>
        </div>
      </Provider>
    )
  }
}

export default ClientApp
