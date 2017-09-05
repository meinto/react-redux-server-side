import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'


class Counter extends PureComponent {

  static propTypes = {
    count: PropTypes.number,

    add: PropTypes.func,
    substract: PropTypes.func,
    reset: PropTypes.func,
  }

  static defaultProps = {
    count: 0,

    add: () => {},
    substract: () => {},
    reset: () => {},
  }

  _getNumberFromInput = () => {
    return parseInt(this.input.value) || 0
  }

  _add = () => {
    const number = this._getNumberFromInput()
    this.props.add(number)
  }

  _substract = () => {
    const number = this._getNumberFromInput()
    this.props.substract(number)
  }

  _reset = () => {
    const number = this._getNumberFromInput()
    this.props.reset(number)
  }

  render() {
    return (
      <div>
        <p>{this.props.count}</p>
        <input
          ref={ref => this.input = ref}
        />
        <button
          onClick={this._add}
        >ADD!</button>
        <button
          onClick={this._substract}
        >SUBSTRACT</button>
        <button
          onClick={this._reset}
        >RESET</button>
      </div>
    )
  }
}


export default Counter
