import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { _ns_token_ } from '../../config/constants'
import activeForm from '../../helpers/activeForm'
import activeGoogleForm from '../../helpers/activeGoogleForm'
import handleAPIRequests from '../../helpers/handleAPIRequests'
import { useLoginMutation } from '../../lib/api/Auth/authEndpoints'
import CustomImage from '../Shared/CustomImage'
import routes from '../../config/routes'


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
  const Login = (token) => {
    handleAPIRequests({
      request: login,
      url: 'relative',
      token,
      onSuccess: onSuccess,
    })
  }

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
      <div className='h-[200px] flex justify-center items-center'>
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              Login(credentialResponse?.credential)
            }}
            onError={() => {
              console.log('Login Failed')
            }}
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  )
}

export default SignupForm
