import { useGoogleLogin } from '@react-oauth/google'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useSelector } from 'react-redux'
import { _ns_token_ } from '../../config/constants'
import routes from '../../config/routes'
import activeForm from '../../helpers/activeForm'
import activeGoogleForm from '../../helpers/activeGoogleForm'
import handleAPIRequests from '../../helpers/handleAPIRequests'
import { useLoginMutation } from '../../lib/api/Auth/authEndpoints'
import CustomImage from '../Shared/CustomImage'



const SignupForm = () => {
  const [activeLogin, setActiveLogin] = useState(null)
  const [activeGoogleLogin, setActiveGoogleLogin] = useState(null)

  const { school, admin, parent, student, employee } = activeForm(activeLogin)
  const { parent: Parent, student: Student } =
    activeGoogleForm(activeGoogleLogin)

  const router = useRouter()

  const lang = useSelector((state) => state?.translation?.payload)

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

  const onSuccess = (res) => {
    if (res.payload) {
      localStorage.setItem(_ns_token_, res?.payload?.accessToken || '')
      router.push(routes.dashboard.url)
    }
  }
  const [login, { isLoading }] = useLoginMutation()
  

  const Login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      handleAPIRequests({
        request: login,
        url: 'relative',
        token: tokenResponse.access_token,
        onSuccess: onSuccess,
      })
    },
  })

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
      <div>Gmail up as relative</div>
      <div className='h-[200px] w-full flex justify-center items-center'>
      <div
        className=' p-2 w-full border hover:cursor-pointer'
        onClick={() => Login()}
      >
         <div className=' w-[79%]  lg:w-[50%] grid grid-cols-2  lg:flex lg:flex-row mx-auto  items-center'>
         <FcGoogle size={20}  />
          <p className='lg:text-base  text-sm text-dark lg:pl-5 w-full'>google login</p>
         </div>
      </div>
      </div>
    </div>
  )
}

export default SignupForm
