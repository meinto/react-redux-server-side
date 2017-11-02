import { combineEpics } from 'redux-observable'
import routerEpic$ from '../router/epic'
import pageEpic$ from '../page/epic'


export default combineEpics(
  pageEpic$,
  routerEpic$,
)
