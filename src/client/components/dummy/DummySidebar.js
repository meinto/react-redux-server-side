import React from 'react'
import { Link } from 'react-router-dom'
import { DUMMY_PAGE_DATA } from './dummyPageData'

const DummySidebar = () => {
  return (
    <div style={styles.container}>
      <h2>My Sidebar</h2>
      <p><Link to='/'>Home</Link></p>
      {DUMMY_PAGE_DATA.map((data, index) => {
        return (
          <p key={index}>
            <Link to={`/page/${data.id}`}>
              {data.title}
            </Link>
          </p>
        )
      })}
    </div>
  )
}


const styles = {
  container: {
    width: 300,
    backgroundColor: '#eee',
    overflow: 'hidden',
    padding: 20,
    float: 'left',
  },
}

export default DummySidebar
