import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'

import { Column, Row } from './components/atoms/Grid'
import DummySidebar from './components/dummy/DummySidebar'

class App extends Component {

  static propTypes = {
    route: PropTypes.object,
  }

  render() {
    return (
      <Row>
        <DummySidebar />
        <Column small-12 medium-8>
          {renderRoutes(this.props.route.routes)}
        </Column>
      </Row>
    )
  }
}

export default App
