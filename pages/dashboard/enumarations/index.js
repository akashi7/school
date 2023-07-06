import React from 'react'
import Private from '../../../components/Routes/Private'
import EmployeeEnumaration from './enumarations'
import Layout from '../../../components/Layout/index'

const Index = () => {
  return (
    <Layout>
      <EmployeeEnumaration />
    </Layout>
  )
}

export default Private(Index)
