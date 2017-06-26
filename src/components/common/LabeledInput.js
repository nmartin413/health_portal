import React, { Component } from 'react'

export default class LabeledInput extends Component {

  render() {
    const { props: { label }} = this

    return (
      <div>
        <label className="Form-label">{label}</label>
        <input className="Form-input" {...this.props} />
      </div>
    )
  }

}
