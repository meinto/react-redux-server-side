/*global idx*/
import React, { PureComponent } from 'react'
import { DUMMY_PAGE_DATA } from './dummyPageData'


class DummyPage extends PureComponent {

  render() {
    console.log('render')
    const pageId = idx(this.props, _ => _.match.params.pageId) || 0
    const title = this.props.title
      ? this.props.title
      : `Page - ${pageId} - ${DUMMY_PAGE_DATA[pageId - 1].title}`
    return (
      <div style={styles.container}>
        <h1>{title}</h1>
      </div>
    )
  }
}


const styles = {
  container: {
    overflow: 'hidden',
    padding: 20,
  },
}

export default DummyPage
