import { connect } from 'react-redux'

import {
  add,
  substract,
  reset,
} from './../../modules/dummy/dummy'
import { getDummy } from './../../modules/root/selectors'
import { getCount } from './../../modules/dummy/selectors'

import Counter from './../../components/dummy/DummyCounter'


const mapState = state => {
  return {
    count: getCount(getDummy(state)),
  }
}

const bindDispatch = {
  add,
  substract,
  reset,
}

export default connect(mapState, bindDispatch)(Counter)
