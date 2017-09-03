import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'

import DummySidebar from './components/dummy/DummySidebar'

class App extends Component {

  static propTypes = {
    route: PropTypes.object,
  }

  render() {
    return (
      <div>
        <DummySidebar />
        {renderRoutes(this.props.route.routes)}
      </div>
    )
  }
}

export default App
