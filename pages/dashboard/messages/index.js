import React from 'react'
import Private from '../../../components/Routes/Private'
import Messages from './messages'
import Layout from '../../../components/Layout/index'

const Index = () => {
  return (
    <Layout>
      <Messages />
    </Layout>
  )
}

export default Private(Index)
