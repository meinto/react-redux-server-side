export const ACTION_TYPES = {
  SET_PAGE_TYPE: 'seo/seo/SET_PAGE_TYPE',
}

// TODO: insert more page types
export const PAGE_TYPES = {
  PAGE: 'PAGE',
}

export const setPageType = pageType => {
  return {
    type: ACTION_TYPES.SET_PAGE_TYPE,
    pageType,
  }
}

const initialState = ''
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ACTION_TYPES.SET_PAGE_TYPE:
      return action.pageType
    default:
      return state
  }
}
