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
  const { isAdmin, isSchool, isParent, isStudent, isEmployee, isrelative } =
    userType(role)

  return (
    <Layout>
      {isAdmin ? (
        <Analytics isAdmin={isAdmin} />
      ) : isParent ? (
        <Children />
      ) : isStudent ? (
        <ActiveStudent />
      ) : isEmployee ? (
        <ActiveEmployee />
      ) : isrelative? <Children />: (
        <Analytics isAdmin={isAdmin} />
      )}
    </Layout>
  )
}

export default Private(Dashboard)
