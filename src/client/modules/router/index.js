import { routerReducer } from 'react-router-redux'


export const ACTION_TYPES = {
  NOT_FOUND$: 'router/NOT_FOUND$',
}

export const REDIRECTS = {
  '/test': '/',
}

export const notFound = () => {
  return {
    type: ACTION_TYPES.NOT_FOUND$,
  }
}


const initialState = {
  location: {
    pathname: '/',
  },
}
export default (state = initialState, action = {}) => {
  return routerReducer(state, action)
}
