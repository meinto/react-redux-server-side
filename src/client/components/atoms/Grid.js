import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'


export class Column extends PureComponent {

  static propTypes = {
    children: PropTypes.any,
  }
  
  _getClasses = () => {
    return Object.keys(this.props).filter(key => {
      const isDefinedPropType = Object.keys(Column.propTypes).find(propTypeKey => propTypeKey === key) !== undefined
      return !isDefinedPropType
    })
  }

  render() {
    return (
      <div className={`${this._getClasses().join(' ')} columns`}>
        {this.props.children}
      </div>
    )
  }
}

export class Row extends PureComponent {

  static propTypes = {
    children: PropTypes.any,
  }

  render() {
    return (
      <div className={'row'}>
        {this.props.children}
      </div>
    )
  }

}
