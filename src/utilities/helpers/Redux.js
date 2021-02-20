export function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
      if (handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](state, action)
      } else {
        return state
      }
    }
  }
  
  export const CreateDispatcherObj = (type, payload, storeloc, value) => {
    return {
      payload: payload,
      type: type,
      strloc: storeloc,
      value: value
    };
  }