const ACTION_TYPES = {
  ADD: 'dummy/dummy/ADD',
  SUBSTRACT: 'dummy/dummy/SUBSTRACT',
  RESET: 'dummy/dummy/RESET',
}


export const add = number => {
  return {
    type: ACTION_TYPES.ADD,
    number,
  }
}

export const substract = number => {
  return {
    type: ACTION_TYPES.SUBSTRACT,
    number,
  }
}

export const reset = () => {
  return {
    type: ACTION_TYPES.RESET,
  }
}

const initialState = 0
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ACTION_TYPES.ADD:
      return state + action.number
    case ACTION_TYPES.SUBSTRACT:
      return state - action.number
    case ACTION_TYPES.RESET:
      return initialState
    default:
      return state
  }
}
