// @flow
import React, { Component } from "react"
import { connect } from "react-redux"

import "./App.css"
import {loadDataFilenames} from "./services/actionsCreators"
import {getDataFilenames} from "./services/reducer"
import Visualization from "./components/Visualization"
import appendScript from "./tools/appendScript"

class Home extends Component {

  componentWillMount() {
    const { initFilenames } = this.props
    initFilenames()
  }

  render() {
    const { dataFilenames } = this.props

    return (
      <div className="Home">
        {["https://www.sfu.ca/~oalemi/data/KAREN_BEAS_001_original.bvh"].map((filename, i) => <Visualization filename={filename} key={i} classname={`file-${i}`} />)}
      </div>
    )
  }
}

export default connect(state => ({
  dataFilenames: getDataFilenames(state)
}), dispatch => ({
  initFilenames: () => dispatch(loadDataFilenames())
}))(Home)
