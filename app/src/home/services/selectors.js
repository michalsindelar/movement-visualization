import * as R from "ramda"
import { createSelector } from "reselect"

import { getFoo } from "./reducer"

export const getFooCombinedSelector = createSelector(getFoo, R.identity)
