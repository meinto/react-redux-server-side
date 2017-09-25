
/*const Page = ({ url }) => {
  return (
    <Row>
      <a href={url}>Das ist eine Page</a>
    </Row>
  )
}*/

/*
 * COMPONENTS
 */
// __tests__/page.test.js
// components/Page.js
import React, { PureComponent } from 'react'
import Row from './Row'

class Page extends PureComponent {

  _getText = () => {
    const text = this.textinput.value
    this.props.setText(text)
  }

  render() {
    return (
      <Row>
        <a href={url}>Das ist eine Page</a>
        <input
          ref={ref => this.textinput}
          type="text"
        />
        <button
          onClick={this._getText}
        >GET TEXT</button>
        <p>{this.props.pageText}</p>
      </Row>
    )
  }
}

export default Page


// components/App.js
import React, { PureComponent } from 'react'
import Page from './Page'
import Comp from './Comp'


class App extends PureComponent {

  render() {
    return (
      <div>
        <Page
          url={'http://mein-url.com'}
        />
      </div>
    )
  }
}

/*
 * CONTAINERS
 */
// containers/PageContainer.js
import { connect } from 'react-redux'
import Page from '../components/Page'
import { updateText } from '../module/text/textStore'
import { getSubModuleText } from '../modules/root/selectors'
import { getText } from '../modules/text/selectors'


// Mapping für Daten aus dem store
const mapState = state => {
  return {
    pageText: getText(getSubModuleText(state))
  }
}

// Callback Functions um Store zu aktualisieren
const bindDispatch = {
  setText: updateText,
}


export default connect(mapState, bindDispatch)(Page)

/*
 * MODULES
 */

// modules/root/index.js
import text from '../text'

export default combineReducers({
  text,
})

// selectors.js
export const getSubModuleText = state => {
  return state.text
}

///////////////////////////////////////////
// modules/text/textStore.js
// modules/text/index.js
// modules/text/selectors.js 

// actionTypes
const ACTION_TYPES = {
  UPDATE: 'modules/text/textStore/UPDATE'
}

// actions
export const updateText = text => {
  return {
    type: ACTION_TYPES.UPDATE,
    text,
  }
}

// reducer
const initialState = ''
export default (state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.UPDATE: {
      return action.text
    }
    default: {
      return state
    }
  }
}

//
// modules/text/selectors.js
export const getText = state => {
  return idx(state, _ => _.textStore) || ''
}


////////////////////////////////////////
/*
 * DER STATE
 */ 

{
  text: {
    textStore: ''
  }
}

{
  root: {
    location: {
      ...
    }
    performer: {
      instruments: [

      ]
      ui: {
        open: false
      }
    }
  }
}


