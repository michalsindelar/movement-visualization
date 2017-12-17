// @flow
import React, { Component } from "react"
import * as R from "ramda"
import { connect } from "react-redux"

import "./App.css"
import {loadDataFilenames} from "./services/actionsCreators"
import {getDataFilenames} from "./services/reducer"

class Home extends Component {

  componentWillMount() {
    const { initFilenames } = this.props
    initFilenames()
  }

  render() {
    const { dataFilenames } = this.props

    return (
      <div className="Home">
        {dataFilenames.map(R.identity)}
      </div>
    )
  }
}

export default connect(state => ({
  dataFilenames: getDataFilenames(state)
}), dispatch => ({
  initFilenames: () => dispatch(loadDataFilenames())
}))(Home)
