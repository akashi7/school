import {
  useGoogleLogin
} from '@react-oauth/google'
import Dropdown from 'antd/lib/dropdown'
import Form from 'antd/lib/form'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { _ns_token_, _selected_lang_, available_langs } from '../../config/constants'
import routes from '../../config/routes'
import handleAPIRequests from '../../helpers/handleAPIRequests'
import requiredField from '../../helpers/requiredField'
import { useLoginMutation } from '../../lib/api/Auth/authEndpoints'
import CustomButton from '../Shared/CustomButton'
import CustomImage from '../Shared/CustomImage'
import CustomInput from '../Shared/CustomInput'

import { FcGoogle } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import translate from '../../config/translate'
import { getTranslation } from '../../lib/redux/translationSlice'

const AdminLogin = ({ setActiveLogin, lang }) => {
  const [form] = Form.useForm()
  const router = useRouter()

  const local_saved_lang = localStorage.getItem(_selected_lang_)
  const dispatch = useDispatch()

  const globalLanguage = useSelector((state) => state?.translation?.payload)

  const [selectedLang, setSelectedLang] = useState(local_saved_lang || '')
  const trans = translate(selectedLang)

  const handleSelectLanguage = (lng) => {
    localStorage.setItem(_selected_lang_, lng)
    setSelectedLang(lng)
  }

  useEffect(() => {
    dispatch(getTranslation(trans))
  }, [dispatch, trans])

  const [login, { isLoading }] = useLoginMutation()

  const onSuccess = (res) => {
    if (res.payload) {
      localStorage.setItem(_ns_token_, res?.payload?.accessToken || '')
      router.push(routes.dashboard.url)
    }
  }

  const onFinish = (values) => {
    handleAPIRequests({
      request: login,
      url: 'user',
      ...values,
      countryCode: 'RW',
      onSuccess: onSuccess,
    })
  }

  const Login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      handleAPIRequests({
        request: login,
        url: 'google/student',
        token: tokenResponse.access_token,
        onSuccess: onSuccess,
      })
    },
  })

  const dropdownOptions = (
    <div className='bg-gray-100 p-2'>
      {available_langs
        ?.filter((lng) => lng?.name !== trans?.name)
        .map((lang) => (
          <div
            key={lang.value}
            onClick={() => handleSelectLanguage(lang.value)}
            className='flex gap-4 bg-white hover:bg-gray-200 mb-1 cursor-pointer p-2 rounded text-sm items-center w-[100%]'
          >
            <span className='text-[18px]'>{lang.flag}</span>
            <span className='text-[12px] text-left flex-1 font-medium'>
              {lang.name}
            </span>
          </div>
        ))}
    </div>
  )

  return (
    <>
      <Form
        onFinish={onFinish}
        name='login-form'
        form={form}
        className='w-[100%]'
      >
        {/* <Row
				justify="center"
				align="middle"
				gutter={24}
				className="mt-8 w-[100%] mb-6"
				wrap={false}
			>
				<Col onClick={() => setActiveLogin(null)}>
					<CustomImage
						src="/icons/back.svg"
						className="cursor-pointer bg-gray-500 hover:bg-gray-600 p-[6px] mt-1 rounded"
					/>
				</Col>

				<Col className="font-[500] text-dark text-[24px] truncate" flex={1}>
					{lang?.auth?.as_admin?.title}
				</Col>
			</Row> */}

        <div className='w-[100%]'>
          <CustomInput
            label={lang?.auth?.as_admin?.email}
            name='email'
            placeholder='john@example.domain'
            rules={requiredField('Email')}
          />
        </div>

        <div className='w-[100%]'>
          <CustomInput
            label={lang?.auth?.as_admin?.password}
            inputType='password'
            placeholder='*** *** ***'
            name='password'
            rules={requiredField('Password')}
          />
        </div>

        <CustomButton
          type='primary'
          className='w-[100%] h-[52px] font-bold mt-2 mb-4'
          htmlType='submit'
          loading={isLoading}
        >
          {lang?.auth?.as_admin?.button}
        </CustomButton>
      </Form>
      <p className=' mt-[-40px] mb-[-20px]'>{lang?.auth?.or}</p>
      {/* <div className=' mx-auto w-[60%]'>
        <GoogleOAuthProvider clientId={clientId}  >
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              Login(credentialResponse?.credential)
            }}
            onError={() => {
              console.log('Login Failed')
            }}
						
          />
        </GoogleOAuthProvider>
      </div> */}
      <div
        className=' p-2 w-full border hover:cursor-pointer'
        onClick={() => Login()}
      >
         <div className=' w-[79%]  lg:w-[50%] grid grid-cols-2  lg:flex lg:flex-row mx-auto  items-center'>
         <FcGoogle size={20}  />
          <p className='lg:text-base  text-sm text-dark lg:pl-5 w-full'>google login</p>
         </div>
      </div>
      <div className='w-[100%] grid justify-end px-4'>
        <Dropdown overlay={dropdownOptions} trigger={['click']} placement='top'>
          <div className='lg:flex lg:gap-4 bg-gray-200 p-2 rounded text-sm items-center w-[100%] ml-2 cursor-pointer hover:bg-gray-300'>
            <span className='text-[18px]'>{globalLanguage?.flag}</span>
            <span className='text-[12px] lg:pl-0 pl-5 text-left flex-1 font-medium'>
              {globalLanguage?.name}
            </span>
            <CustomImage
              src='/icons/expand.svg'
              width={14}
              height={14}
              className='object-cover rounded-full lg:pl-0 pl-1'
            />
          </div>
        </Dropdown>
      </div>
    </>
  )
}

AdminLogin.propTypes = {
  setActiveLogin: PropTypes.func,
}

export default AdminLogin
