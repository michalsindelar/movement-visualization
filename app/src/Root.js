import React from "react"
import { Switch, Route } from "react-router-dom"

import Home from "./home"

// When adding a new route, add it also to src/server/clientPaths.js
const Root = () => (
  <Switch>
    <Route path="/" component={Home} />
  </Switch>
)

export default Root
