import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import activeForm from '../../helpers/activeForm'
import AdminLogin from '../Auth/AdminLogin'
import AuthIndex from '../Auth/AuthIndex'
import EmployeeLogin from '../Auth/EmployeeLogin'
import ParentLogin from '../Auth/ParentLogin'
import SchoolLogin from '../Auth/SchoolLogin'
import StudentLogin from '../Auth/StudentLogin'
import CustomImage from '../Shared/CustomImage'
import { useRouter } from 'next/router'

const LoginForm = () => {
  const [activeLogin, setActiveLogin] = useState(null)

  const { school, admin, parent, student, employee } = activeForm(activeLogin)

  const router = useRouter()

  const lang = useSelector((state) => state?.translation?.payload)

  return (
    <div className='m-auto bg-white rounded-[12px] p-12  w-full md:w-[500px] flex flex-col items-center'>
      {!activeLogin && (
        <div
          onClick={() => {
            setActiveLogin(null)
            router.back()
          }}
          className='flex flex-row items-center'
        >
          <CustomImage
            src='/icons/back.svg'
            className='cursor-pointer bg-gray-500 hover:bg-gray-600 p-[6px] mt-1 rounded'
          />
          <p>Go to home page</p>
        </div>
      )}
      <CustomImage src='/icons/logo.png' width={240} />
      {school ? (
        <SchoolLogin lang={lang} setActiveLogin={setActiveLogin} />
      ) : admin ? (
        <AdminLogin lang={lang} setActiveLogin={setActiveLogin} />
      ) : parent ? (
        <ParentLogin lang={lang} setActiveLogin={setActiveLogin} />
      ) : student ? (
        <StudentLogin lang={lang} setActiveLogin={setActiveLogin} />
      ) : employee ? (
        <EmployeeLogin lang={lang} setActiveLogin={setActiveLogin} />
      ) : (
        <AuthIndex setActiveLogin={setActiveLogin} />
      )}
    </div>
  )
}

export default LoginForm
