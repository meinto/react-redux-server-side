import ga from 'react-google-analytics'

export const createAnalyticsMiddleware = () => {
  return store => next => action => { // eslint-disable-line

    if (action.type.indexOf('@@router/LOCATION_CHANGE') !== -1) {

      // TODO: config file
      ga('create', 'UA-XXXX-X', 'auto')
      ga('set', 'page', action.payload.pathname)
      ga('send', 'pageview')

    }

    next(action)
  }
}
