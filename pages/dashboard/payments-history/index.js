import React from 'react'
import Layout from '../../../components/Layout'
import Private from '../../../components/Routes/Private'
import AllPaymentsHistory from './allPaymentsHistory'

const Index = () => {
  return (
    <Layout>
      <AllPaymentsHistory />
    </Layout>
  )
}

export default Private(Index)
