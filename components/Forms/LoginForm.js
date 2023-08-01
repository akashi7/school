import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import activeForm from '../../helpers/activeForm'
import activeGoogleForm from '../../helpers/activeGoogleForm'
import AdminLogin from '../Auth/AdminLogin'
import CustomImage from '../Shared/CustomImage'

const LoginForm = () => {
  const [activeLogin, setActiveLogin] = useState(null)
  const [activeGoogleLogin, setActiveGoogleLogin] = useState(null)

  const { school, admin, parent, student, employee } = activeForm(activeLogin)
  const { parent: Parent, student: Student } =
    activeGoogleForm(activeGoogleLogin)

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
          <p>{lang?.auth?.goback}</p>
        </div>
      )}
      <CustomImage src='/icons/logo.png' width={240} />
      <AdminLogin lang={lang} setActiveLogin={setActiveLogin} />
    </div>
  )
}

export default LoginForm
