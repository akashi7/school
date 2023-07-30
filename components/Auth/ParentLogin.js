import Col from 'antd/lib/col'
import Form from 'antd/lib/form'
import Row from 'antd/lib/row'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import React from 'react'
import handleAPIRequests from '../../helpers/handleAPIRequests'
import requiredField from '../../helpers/requiredField'
import { useLoginMutation } from '../../lib/api/Auth/authEndpoints'
import CustomButton from '../Shared/CustomButton'
import CustomImage from '../Shared/CustomImage'
import CustomInput from '../Shared/CustomInput'

const ParentLogin = ({ setActiveLogin, lang }) => {
  const [form] = Form.useForm()
  const router = useRouter()

  const [login, { isLoading }] = useLoginMutation()

  const onSuccess = (res) => {
    if (res.payload) {
      localStorage.setItem('user', 'parent')
      router.push('/GoogleLogin')
    }
  }

  const onFinish = (values) => {
    handleAPIRequests({
      request: login,
      url: 'parent',
      ...values,
      onSuccess: onSuccess,
    })
  }

  return (
    <Form
      onFinish={onFinish}
      name='login-form'
      form={form}
      className='w-[100%]'
    >
      <Row
        justify='center'
        align='middle'
        gutter={24}
        className='mt-8 w-[100%] mb-6'
        wrap={false}
      >
        <Col onClick={() => setActiveLogin(null)}>
          <CustomImage
            src='/icons/back.svg'
            className='cursor-pointer bg-gray-500 hover:bg-gray-600 p-[6px] mt-1 rounded'
          />
        </Col>

        <Col className='font-[500] text-dark text-[24px] truncate' flex={1}>
          {lang?.auth?.as_parent?.title}
        </Col>
      </Row>

      <div className='w-[100%]'>
        <CustomInput
          label={lang?.auth?.as_parent?.email}
          name='phone'
          placeholder='07* *** ***'
          rules={requiredField('phone')}
        />
      </div>

      <CustomButton
        type='primary'
        className='w-[100%] h-[52px] font-bold mt-2 mb-4'
        htmlType='submit'
        loading={isLoading}
      >
        {lang?.auth?.as_parent?.button}
      </CustomButton>
    </Form>
  )
}

ParentLogin.propTypes = {
  setActiveLogin: PropTypes.func,
}

export default ParentLogin
