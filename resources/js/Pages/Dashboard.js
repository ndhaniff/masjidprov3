import React from 'react'
import Admin from '../Layouts/Admin'

function Dashboard() {
  return (
    <h1>Utama</h1>
  )
}

Dashboard.layout = page => <Admin children={page}></Admin>

export default Dashboard