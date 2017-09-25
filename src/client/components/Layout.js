import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { renderRoutes } from 'react-router-config'

import Meta from './Meta'
import { Row } from './atoms/Grid'
import Header from './Header'


class App extends Component {

  static propTypes = {
    route: PropTypes.object,
  }

  render() {
    return (
      <Row>
        <div style={styles.container}>
          <Meta />
          {renderRoutes(this.props.route.routes)}
        </div>
      </Row>
    )
  }
}


const styles = {
  container: {
    marginTop: 20,
  },
}

export default App
