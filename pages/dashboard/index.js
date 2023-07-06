import React from 'react'
import Layout from '../../components/Layout/index'
import Classes from './classes'
import Private from '../../components/Routes/Private'
import userType from '../../helpers/userType'
import { isTokenValid } from '../../helpers/verifyToken'
import Schools from './schools'
import Children from './children/children'
import ActiveStudent from './active-student'
import Analytics from './analytics'
import ActiveEmployee from './active-employee'

const Dashboard = () => {
  const { role } = isTokenValid()
  const { isAdmin, isSchool, isParent, isStudent, isEmployee } = userType(role)

  return (
    <Layout>
      {isAdmin ? (
        <Schools />
      ) : isParent ? (
        <Children />
      ) : isStudent ? (
        <ActiveStudent />
      ) : isEmployee ? (
        <ActiveEmployee />
      ) : (
        <Analytics />
      )}
    </Layout>
  )
}

export default Private(Dashboard)
