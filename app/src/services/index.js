import { createStore, applyMiddleware } from "redux"
import createHistory from "history/createBrowserHistory"
import thunk from "redux-thunk"

import home from "../home/services/reducer"

export const history = createHistory()
export const store = createStore(home, applyMiddleware(thunk))
