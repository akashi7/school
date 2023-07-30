import React from 'react'
import Private from '../../../components/Routes/Private'
import Schools from './schools'
import Layout from '../../../components/Layout'

const Index = () => {
  return (
    <Layout>
      <Schools />
    </Layout>
  )
}

export default Private(Index)
