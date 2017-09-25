import React, { PureComponent } from 'react'

import { Row, Column } from './atoms/Grid'


class Header extends PureComponent {
  render() {
    return (
      <div style={styles.container}>
        <Row>
          <Column small-12>
            <p>Admin Backend</p>
          </Column>
        </Row>
      </div>
    )
  }
}


const styles = {
  container: {
    backgroundColor: '#ccc',
  },
}

export default Header
