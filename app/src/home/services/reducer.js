import * as R from "ramda"

import { SET_DATA_FILENAMES } from "./actions"

const DEFAULT_STATE = {
  dataFilenames: [],
}

const reducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_DATA_FILENAMES:
      return R.assoc("dataFilenames", action.payload.data, state)

    default:
      return state
  }
}

export const getDataFilenames = R.prop("dataFilenames")

export default reducer
