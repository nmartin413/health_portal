import './Button.css'

import cx                   from 'classnames'
import PropTypes            from 'prop-types'
import React, { Component } from 'react'

export default class Button extends Component {

  static propTypes = {
    type    : PropTypes.string.isRequired,
    label   : PropTypes.string.isRequired,
    onClick : PropTypes.func,
    primary : PropTypes.bool.isRequired,
  }

  static defaultProps = {
    primary: false
  }

  render() {
    const { props: { label, type, onClick, primary }} = this

    const buttonProps = { type, onClick, className: cx('Button', { primary }) }

    return (
      <button {...buttonProps}>{label}</button>
    )
  }

}
