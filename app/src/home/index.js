// @flow
import React, { Component } from "react"
import { connect } from "react-redux"

import "./App.css"
import {loadDataFilenames} from "./services/actionsCreators"
import {getDataFilenames} from "./services/reducer"
import Visualization from "./components/Visualization"

class Home extends Component {

  componentWillMount() {
    const { initFilenames } = this.props
    initFilenames()
  }

  render() {
    const { dataFilenames } = this.props

    // FIXME: Better
    const url = `${window.location.protocol}//${window.location.host}/getFile?filename=`.replace("3000", "5000")

    return (
      <div className="Home">
        {dataFilenames
          .map(x => url + x)
          .map((filename, i) => <Visualization filename={filename} key={i} classname={`file-${i}`} />)}
      </div>
    )
  }
}

export default connect(state => ({
  dataFilenames: getDataFilenames(state)
}), dispatch => ({
  initFilenames: () => dispatch(loadDataFilenames())
}))(Home)
