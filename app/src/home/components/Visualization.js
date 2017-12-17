// @flow
import React, { Component } from "react"
import VisualizationEngine from "../tools/VisualizationEngine"

class Visualization extends Component {

  componentDidMount() {
    const { filename, classname } = this.props

    const vis = new VisualizationEngine(`.${classname}`)
    vis.run()
  }

  render() {
    const { filename, classname } = this.props

    return (
      <div className={classname}>
        <code>{filename}</code>
      </div>

    )
  }
}

export default Visualization
