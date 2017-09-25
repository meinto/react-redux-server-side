import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import dummy from './../dummy/dummy'

export default combineReducers({
  dummy,
  router: routerReducer,
})
