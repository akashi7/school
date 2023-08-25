import React from 'react'
import AnalyticsHeader from '../../../components/Analytics/AnalyticsHeader'
import AnalyticsTable from '../../../components/Analytics/AnalyticsTable'

const Analytics = ({ isAdmin }) => {
  return (
    <div
      className='overflow-y-auto analytics p-2'
      style={{ height: 'calc(100vh - 120px)' }}
    >
      <AnalyticsHeader isAdmin={isAdmin} />
      <AnalyticsTable />
    </div>
  )
}

export default Analytics
