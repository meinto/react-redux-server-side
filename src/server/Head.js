import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'


class Head extends PureComponent {

  static propTypes = {
    title: PropTypes.string,
  }

  static defaultProps = {
    title: '',
  }

  render() {
    return (
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>{this.props.title}</title>
        <link rel="stylesheet" href="/css/foundation.min.css"/>
      </head>
    )
  }
}


export default Head
