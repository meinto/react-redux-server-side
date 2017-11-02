import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux'
import { SSR_DEPENDENCIES_MOCK } from 'redux-observables-server-side-rendering'

import { isProduction } from './env'
import { createRouterDataLoadingMiddleware } from '../middlewares/routerDataLoading'
import { createAnalyticsMiddleware } from '../middlewares/analytics'
import rootReducer, { epic as rootEpic } from '../modules/root'

const initalOptions = {
  middlewares: [],
  epicOptions: {
    dependencies: SSR_DEPENDENCIES_MOCK,
  },
  history: null,
}
export const configureStore = (initialState = {}, options = initalOptions) => {

  const _options = Object.assign(initalOptions, options)

  let middlewares = []
  middlewares = [...middlewares, createEpicMiddleware(rootEpic, _options.epicOptions)]

  if (_options.history) {
    middlewares = [...middlewares, createRouterMiddleware(_options.history)]
    middlewares = [...middlewares, createRouterDataLoadingMiddleware()]
  }

  if (isProduction())
    middlewares = [...middlewares, createAnalyticsMiddleware()]

  // its important that the ssr middleware stands at the last place of the array
  if (_options.middlewares.length > 0)
    middlewares = [...middlewares, ..._options.middlewares]
  
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares.filter(n => n))
  )

  return store
}
