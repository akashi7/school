import Col from 'antd/lib/col'
import Form from 'antd/lib/form'
import Row from 'antd/lib/row'
import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import requiredField from '../../helpers/requiredField'
import { useWindowSize } from '../../helpers/useWindowSize'
import CustomInput from '../Shared/CustomInput'
import { isTokenValid } from '../../helpers/verifyToken'
import userType from '../../helpers/userType'

const NewMessageForm = ({ onFinish, form }) => {
  const { role } = isTokenValid()

  const lang = useSelector((state) => state?.translation?.payload)
  const { width } = useWindowSize()
  const isScreenSmall = width <= 1024

  const type = [
    { key: 1, value: 'EMAIL', label: 'Email' },
    { key: 2, value: 'PHONE', label: 'Phone' },
  ]

  const usersofAdmin = [
    { key: 1, value: 'STUDENT', label: 'Student' },
    { key: 2, value: 'PARENT', label: 'Parent' },
    { key: 3, value: 'SCHOOL', label: 'Schoool' },
    { key: 3, value: 'EMPLOYEE', label: 'Employee' },
    { key: 3, value: 'RELATIVE', label: 'Relative' },
  ]
  const users = [
    { key: 1, value: 'STUDENT', label: 'Student' },
    { key: 2, value: 'PARENT', label: 'Parent' },
    { key: 3, value: 'EMPLOYEE', label: 'Employee' },
    { key: 3, value: 'RELATIVE', label: 'Relative' },
  ]
  return (
    <Form form={form} name='add-message' onFinish={onFinish}>
      <Row wrap={false} gutter={24}>
        <Col span={isScreenSmall ? 24 : 12}>
          <CustomInput
            label={'To'}
            name='to'
            type='select-multiple'
            rules={requiredField('user')}
            placeholder='Please select'
            style={{
              width: '100%',
            }}
            options={userType(role).isAdmin ? usersofAdmin : users}
          />
        </Col>
        <Col span={isScreenSmall ? 24 : 12}>
          <CustomInput
            label={'Message Type'}
            name='messageType'
            type='select-multiple'
            rules={requiredField('Type')}
            placeholder='Please select'
            style={{
              width: '100%',
            }}
            options={type}
          />
        </Col>
      </Row>
      <Row wrap={false} gutter={24}>
        <Col className='w-[100%]'>
          <CustomInput
            label={'Subject'}
            placeholder={`Subject...`}
            name='subject'
            rules={requiredField('subject')}
          />
        </Col>
      </Row>
      <Row wrap={false} gutter={24}>
        <Col className='w-[100%]'>
        <CustomInput
          label={'Message'}
          placeholder={`message`}
          name='content'
          type='text-area'
          rules={requiredField('message')}
        />
        </Col>
      </Row>
    </Form>
  )
}

NewMessageForm.propTypes = {
  onFinish: PropTypes.func,
  form: PropTypes.object,
}

export default NewMessageForm
