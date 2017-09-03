import './../utils/index'
import React, { Component } from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter,
} from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import PropTypes from 'prop-types'

import DummySidebar from './components/dummy/DummySidebar'

class App extends Component {

  static propTypes = {
    routes: PropTypes.array,
  }

  render() {
    return (
      <BrowserRouter>
        <DummySidebar />
        {renderRoutes(this.props.routes)}
      </BrowserRouter>
    )
  }
}

render(<App />, document.querySelector('#app'))
