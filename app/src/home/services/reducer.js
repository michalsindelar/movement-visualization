import * as R from "ramda"

import { ACTION } from "./actions"

const DEFAULT_STATE = {
  foo: null,
}

const reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ACTION:
      return R.assoc("foo", action.payload.data, state)

    default:
      return state
  }
}

export const getFoo = R.prop("foo")

export default reducer
