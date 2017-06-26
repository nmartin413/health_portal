import cx                   from 'classnames'
import PropTypes            from 'prop-types'
import React, { Component } from 'react'

export default class Button extends Component {

  static propTypes = {
    type        : PropTypes.string.isRequired,
    label       : PropTypes.string.isRequired,
    disabled    : PropTypes.bool.isRequired,
    onClick     : PropTypes.func,
    displayType : PropTypes.string.isRequired,
  }

  static defaultProps = {
    type        : 'button',
    disabled    : false,
    displayType : 'default'
  }

  render() {
    const { props: { label, type, disabled, onClick, displayType }} = this

    const buttonProps = { type, disabled, onClick, className: cx('Button', displayType) }

    return (
      <button {...buttonProps}>{label}</button>
    )
  }

}
