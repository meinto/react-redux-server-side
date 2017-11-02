import { PAGE_TYPES } from './pageType'

const getPageType = state => {
  return idx(state, _ => _.seo.pageType)
}

export const getMetaTitle = state => {
  switch (getPageType(state)) {
    case PAGE_TYPES.PAGE:
      return 'Edit this!!!'
  }
}


export const getMetaDescription = state => {
  switch (getPageType(state)) {
    case PAGE_TYPES.PAGE:
      return '⛅ Edit this!!! ⛅'
  }
}


export const getMetaRobots = state => {
  switch (getPageType(state)) {
    // case PAGE_TYPES.CUSTOM_TYPE:
    //   return (
    //     'noindex, follow'
    //   )
    default:
      return 'index, follow'
  }
}
