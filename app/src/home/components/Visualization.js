// @flow
import React, { Component } from "react"
import VisualizationEngine from "../tools/VisualizationEngine"

class Visualization extends Component {

  componentDidMount() {
    const { filename, classname } = this.props

    const vis = new VisualizationEngine(`.${classname}`)

    // demo
    // vis.run("https://www.sfu.ca/~oalemi/data/KAREN_BEAS_001_original.bvh")

    vis.run(filename)
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
