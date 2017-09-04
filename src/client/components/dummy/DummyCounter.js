import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'


class Counter extends PureComponent {

  static propTypes = {
    count: PropTypes.number,

    add: PropTypes.func,
    substact: PropTypes.func,
    reset: PropTypes.func,
  }

  static defaultProps = {
    count: 0,

    add: () => {},
    substact: () => {},
    reset: () => {},
  }

  _getNumberFromInput = () => {
    return this.input.value || 0
  }

  _add = () => {
    const number = this._getNumberFromInput()
    this.props.add(number)
  }

  _substract = () => {
    const number = this._getNumberFromInput()
    this.props.substact(number)
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
        >+1</button>
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
