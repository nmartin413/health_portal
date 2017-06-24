import './LabeledInput.css'

import React, { Component } from 'react'

export default class LabeledInput extends Component {

  render() {
    const { props: { label }} = this

    return (
      <div className="LabeledInput">
        <label className="LabeledInput-label">{label}</label>
        <input className="LabeledInput-input" {...this.props} />
      </div>
    )
  }

}
