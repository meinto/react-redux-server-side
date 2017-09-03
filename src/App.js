import './utils'
import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import DummySidebar from './components/dummy/DummySidebar'
import DummyPage from './components/dummy/DummyPage'

class App extends Component {
  render() {
    return (
      <Router>

        <div>
          <DummySidebar />
          <Route exact={true} path='/' render={() => {
            return (
              <DummyPage
                title={'Home'}
              />
            )
          }}/>
          <Route path='/page/:pageId' component={DummyPage} />
        </div>
      </Router>
    )
  }
}

export default App
