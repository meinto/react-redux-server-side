import { combineReducers } from 'redux'

import router from '../router'
import seo from '../seo'
import dummy from './../dummy/dummy'

export default combineReducers({
  seo,
  dummy,
  router,
})
