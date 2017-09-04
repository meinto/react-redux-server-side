import React from 'react'
import { Link } from 'react-router-dom'
import { DUMMY_PAGE_DATA } from './dummyPageData'
import { Column, Row } from '../atoms/Grid'

const DummySidebar = () => {
  return (
    <Column small-12 medium-4>
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
    </Column>
  )
}


const styles = {
  container: {
    backgroundColor: '#eee',
    overflow: 'hidden',
    padding: 20,
  },
}

export default DummySidebar
