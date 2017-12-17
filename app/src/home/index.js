// @flow
import React, { Component } from "react"
import { connect } from "react-redux"

import "./App.css"

class Home extends Component {
  props: Props // eslint-disable-line

  render() {
    return <div className="Home">Home Scene</div>
  }
}

export default connect(state => ({}), dispatch => ({}))(Home)
