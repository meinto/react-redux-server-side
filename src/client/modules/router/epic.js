import { combineEpics } from 'redux-observable'
import { replace } from 'react-router-redux'
import { Observable } from 'rxjs'

import { ACTION_TYPES, REDIRECTS } from './index'
import { getRouter } from '../root/selectors'
import { getPathname } from './selectors'

// redirect & not found handling
const checkForRedirect$ = (action$, store, ssr) => action$
  .filter(action => (
    action.type.startsWith('@@router/LOCATION_CHANGE') ||
    action.type === ACTION_TYPES.NOT_FOUND$
  ))
  .switchMap(action => ssr.observe(action,
    Observable.of(action)
      .map(action => {
        const currentPathName = getPathname(getRouter(store.getState()))
        const redirectUrl = REDIRECTS[currentPathName] || ''
        const isRedirect = redirectUrl.length > 0
        const isNotFound = action.type === ACTION_TYPES.NOT_FOUND$
        if (isRedirect) {
          ssr.redirect(redirectUrl)
          return replace(redirectUrl)
        } else if (isNotFound) {
          ssr.notFound()
          return replace('/404')
        } else {
          return {
            type: 'nothing',
          }
        }
      })
  ))


export default combineEpics(
  checkForRedirect$
)
