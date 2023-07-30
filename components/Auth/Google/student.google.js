import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { useRouter } from 'next/router'
import React from 'react'
import { _ns_token_ } from '../../../config/constants'
import routes from '../../../config/routes'
import handleAPIRequests from '../../../helpers/handleAPIRequests'
import { useLoginMutation } from '../../../lib/api/Auth/authEndpoints'

const GoogleStudentLogin = () => {
  const role = localStorage.getItem('user')

  const router = useRouter()

  const [login, { isLoading }] = useLoginMutation()

  const onSuccess = (res) => {
    if (res?.payload) {
      localStorage.clear()
      localStorage.setItem(_ns_token_, res?.payload?.accessToken || '')
      router.push(routes.dashboard.url)
    }
  }

  const Login = (token) => {
    handleAPIRequests({
      request: login,
      url: 'google/student',
      token,
      role,
      onSuccess: onSuccess,
    })
  }

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  return (
    <div>
      <div>
        <GoogleOAuthProvider clientId={clientId}>
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              // Login(credentialResponse?.credential)
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

export default GoogleStudentLogin
