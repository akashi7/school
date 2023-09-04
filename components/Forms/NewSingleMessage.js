import Col from 'antd/lib/col'
import Form from 'antd/lib/form'
import Row from 'antd/lib/row'
import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import requiredField from '../../helpers/requiredField'
import { useWindowSize } from '../../helpers/useWindowSize'
import CustomInput from '../Shared/CustomInput'
import { isTokenValid } from '../../helpers/verifyToken'
import userType from '../../helpers/userType'
import { useGetClassesQuery } from '../../lib/api/Classrooms/classroomsEndpoints'
import { useLazyGetStreamsQuery } from '../../lib/api/Classrooms/classroomsEndpoints'
import handleAPIRequests from '../../helpers/handleAPIRequests'

const NewSingleMessage = ({ onFinish, form,lang }) => {
  

  return (
    <Form form={form} name='add-single-message' onFinish={onFinish}>
      <Row wrap={false} gutter={24}>
        <Col className='w-[100%]'>
          <CustomInput
            label={lang?.students_pg?.modals?.email}
            placeholder='example@gmail.com'
            name='email'
            rules={requiredField('Email')}
          />
        </Col>
      </Row>
      <Row wrap={false} gutter={24}>
        <Col className='w-[100%]'>
          <CustomInput
            label={lang?.message_pg?.modals?.subject}
            placeholder={`${lang?.message_pg?.modals?.subject}...`}
            name='subject'
            rules={requiredField('subject')}
          />
        </Col>
      </Row>
      <Row wrap={false} gutter={24}>
        <Col className='w-[100%]'>
          <CustomInput
            label={lang?.message_pg?.modals?.message}
            placeholder={`${lang?.message_pg?.modals?.message}`}
            name='content'
            type='text-area'
            rules={requiredField('message')}
          />
        </Col>
      </Row>
    </Form>
  )
}

NewSingleMessage.propTypes = {
  onFinish: PropTypes.func,
  form: PropTypes.object,
}

export default NewSingleMessage
