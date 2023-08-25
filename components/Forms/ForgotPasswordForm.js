import Form from 'antd/lib/form'
import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import { _ns_token_ } from '../../config/constants'
import handleAPIRequests from '../../helpers/handleAPIRequests'
import requiredField from '../../helpers/requiredField'
import { useLoginMutation } from '../../lib/api/Auth/authEndpoints'
import CustomButton from '../Shared/CustomButton'
import CustomImage from '../Shared/CustomImage'
import CustomInput from '../Shared/CustomInput'
import Notify from '../Shared/Notification'

const ForgotPasswordForm = () => {
  const [form] = Form.useForm()

  const router = useRouter()

  const lang = useSelector((state) => state?.translation?.payload)

  const onSuccess = (res) => {
    if (res) {
      localStorage.setItem('id', res?.payload?.id)
      Notify({ message: res.message, type: 'success' })
      setTimeout(() => {
        form.resetFields()
        router.push('/CheckCode')
      }, 5000)
    }
  }
  const [login, { isLoading }] = useLoginMutation()
  const onFinish = (values) => {
    handleAPIRequests({
      request: login,
      url: 'reset-password',
      ...values,
      onSuccess: onSuccess,
    })
  }

  return (
    <div className='m-auto bg-white rounded-[12px] p-12  w-full md:w-[500px] flex flex-col items-center'>
      <div
        onClick={() => {
          router.back()
        }}
        className='flex flex-row items-center mb-5'
      >
        <CustomImage
          src='/icons/back.svg'
          className='cursor-pointer bg-gray-500 hover:bg-gray-600 p-[6px] mt-1 rounded'
        />
        <p className='pl-5'>{lang?.auth?.goback}</p>
      </div>

      <div className='grid place-items-center w-full mb-5'>
        <CustomImage
          src='/icons/logo.png'
          className={'w-[150px] lg:w-[240px]'}
        />
      </div>

      <Form
        onFinish={onFinish}
        name='login-form'
        form={form}
        className='w-[100%]'
      >
        <div className='w-[100%]'>
          <CustomInput
            label={lang?.auth?.as_admin?.email}
            name='email'
            placeholder='john@example.domain'
            rules={requiredField('Email')}
          />
        </div>

        <CustomButton
          type='primary'
          className='w-[100%] h-[52px] font-bold mt-2 mb-4'
          htmlType='submit'
          loading={isLoading}
        >
          forgot password
        </CustomButton>
      </Form>
    </div>
  )
}

export default ForgotPasswordForm
