import React, { useState } from 'react'
import { useSelector } from 'react-redux'
// import activeForm from '../../helpers/activeForm'
// import AdminLogin from '../Auth/AdminLogin'
// import AuthIndex from '../Auth/AuthIndex'
// import EmployeeLogin from '../Auth/EmployeeLogin'
// import ParentLogin from '../Auth/ParentLogin'
// import SchoolLogin from '../Auth/SchoolLogin'
// import StudentLogin from '../Auth/StudentLogin'
import { useRouter } from 'next/router'
import activeGoogleForm from '../../../helpers/activeGoogleForm'
import GoogleStudentLogin from '../../Auth/Google/student.google'
import GoogleAuthIndex from '../../Auth/GoogleAuth'
import CustomImage from '../../Shared/CustomImage'

const GoogleLoginForm = () => {
  const [activeLogin, setActiveLogin] = useState(null)

  const { parent, student } = activeGoogleForm(activeLogin)
  const user = localStorage.getItem('user')

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
          <p>Go Back</p>
        </div>
      )}
      <CustomImage src='/icons/logo.png' width={240} />
      {user==='student'||user==='employee'||user==='parent'?<GoogleStudentLogin/>:
      <GoogleAuthIndex setActiveLogin={setActiveLogin} activeLogin={activeLogin} />}
      {/* <GoogleStudentLogin lang={lang} setActiveLogin={setActiveLogin} /> */}
      {/* {school ? (
        <SchoolLogin lang={lang} setActiveLogin={setActiveLogin} />
      ) : admin ? (
        <AdminLogin lang={lang} setActiveLogin={setActiveLogin} />
      ) : parent ? (
        <ParentLogin lang={lang} setActiveLogin={setActiveLogin} />
      ) : student ? (
        <StudentLogin lang={lang} setActiveLogin={setActiveLogin}  />
      ) : 
      employee ? (
        <EmployeeLogin lang={lang} setActiveLogin={setActiveLogin} />
      ) : (
        <AuthIndex setActiveLogin={setActiveLogin} />
      )} */}
    </div>
  )
}

export default GoogleLoginForm
