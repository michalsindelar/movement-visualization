import * as R from "ramda"
import { createSelector } from "reselect"

import { getDataFilenames } from "./reducer"

export const getFooCombinedSelector = createSelector(getDataFilenames, R.identity)
