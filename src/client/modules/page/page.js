export const ACTION_TYPES = {
  CHECK_IF_PAGE_EXISTS$: 'page/page/CHECK_IF_PAGE_EXISTS$',
}

export const checkIfPageExists$ = () => {
  return {
    type: ACTION_TYPES.CHECK_IF_PAGE_EXISTS$,
  }
}
