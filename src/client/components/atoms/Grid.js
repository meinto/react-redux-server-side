import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'


export class Column extends PureComponent {

  static propTypes = {
    children: PropTypes.any,
    dev: PropTypes.bool,
  }
  
  _getClasses = () => {
    return Object.keys(this.props).filter(key => {
      const isDefinedPropType = Object.keys(Column.propTypes).find(propTypeKey => propTypeKey === key) !== undefined
      return !isDefinedPropType
    })
  }

  render() {
    return (
      <div className={`${this._getClasses().join(' ')} columns`} style={this.props.dev ? styles.dev : null}>
        {this.props.children}
      </div>
    )
  }
}

export class Row extends PureComponent {

  static propTypes = {
    children: PropTypes.any,
    dev: PropTypes.bool,
  }

  render() {
    return (
      <div className={'row'} style={this.props.dev ? styles.dev : null}>
        {this.props.children}
      </div>
    )
  }

}

const styles = {
  dev: {
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
  },
}
