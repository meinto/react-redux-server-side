import './../../utils/index'
import React, { PureComponent } from 'react'
import { renderRoutes } from 'react-router-config'
import PropTypes from 'prop-types'


class AppRoute extends PureComponent {

  static propTypes = {
    route: PropTypes.object,
  }

  render() {
    return (
      <div>
        {renderRoutes(this.props.route.routes)}
      </div>
    )
  }
}

export default AppRoute
