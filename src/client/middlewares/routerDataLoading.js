import { matchRoutes } from 'react-router-config'
import type from 'type-detect'
import { routes } from '../config/routes'


export const createRouterDataLoadingMiddleware = () => {
  return store => next => action => { // eslint-disable-line

    if (action.type.indexOf('@@router/LOCATION_CHANGE') !== -1) {
      let epicsToCall = []
      const matchedRoutes = matchRoutes(routes, action.payload.pathname)
      matchedRoutes.forEach(match => {
        if (match.match.isExact === true && type(match.route.epics) === 'function') {
          epicsToCall = [...match.route.epics(match.match.params)]
        }
      })
      
      if (epicsToCall && type(epicsToCall) === 'Array') {
        epicsToCall.forEach(_action => {
          store.dispatch(_action)
        })
      }
    }

    next(action)
  }
}
