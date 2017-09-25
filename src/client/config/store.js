import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux'

import { createRouterDataLoadingMiddleware } from '../middlewares/routerDataLoading'
import rootReducer, { epic as rootEpic } from '../modules/root'

const initalOptions = {
  middlewares: [],
  epicOptions: {
    dependencies: {
      expected: actions => actions,
    },
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

  if (_options.middlewares.length > 0)
    middlewares = [...middlewares, ..._options.middlewares]
  
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  )

  return store
}
