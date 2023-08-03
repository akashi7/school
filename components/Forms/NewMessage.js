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

const NewMessageForm = ({ onFinish, form }) => {
  const { role } = isTokenValid()

  const lang = useSelector((state) => state?.translation?.payload)
  const { width } = useWindowSize()
  const isScreenSmall = width <= 1024

  const [classroomId, setClassroomId] = useState('')

  const { data: classes, isFetching: isClassLoading } = useGetClassesQuery({})
  const [getStreams, { data: streams, isFetching: isStreamLoading }] =
    useLazyGetStreamsQuery()

  useEffect(() => {
    if (classroomId) {
      handleAPIRequests({
        request: getStreams,
        id: classroomId,
      })
    }
  }, [classroomId, getStreams])

  const classList = classes?.payload?.items?.length
    ? [
        ...classes?.payload?.items?.map((item) => ({
          key: item?.id,
          value: item?.id,
          label: item.name,
        })),
      ]
    : []

  const streamsList = streams?.payload?.items?.length
    ? [
        ...streams?.payload?.items?.map((item) => ({
          key: item?.id,
          value: item?.id,
          label: item.name,
        })),
      ]
    : []

  const type = [
    { key: 1, value: 'EMAIL', label: 'Email' },
    { key: 2, value: 'PHONE', label: 'Phone' },
  ]

  useEffect(() => {
    return () => {
      setSelectedUserType([])
      setClassroomId('')
    }
  }, [])

  const usersofAdmin = [
    { key: 1, value: 'STUDENT', label: 'Student' },
    { key: 2, value: 'PARENT', label: 'Parent' },
    { key: 3, value: 'SCHOOL', label: 'Schoool' },
    { key: 4, value: 'EMPLOYEE', label: 'Employee' },
    { key: 5, value: 'RELATIVE', label: 'Relative' },
  ]
  const users = [
    { key: 1, value: 'STUDENT', label: 'Student' },
    { key: 2, value: 'PARENT', label: 'Parent' },
    { key: 3, value: 'EMPLOYEE', label: 'Employee' },
    { key: 4, value: 'RELATIVE', label: 'Relative' },
  ]

  const handleClassroomChange = (id) => {
    setClassroomId(id)
  }

  const [selectedUserType, setSelectedUserType] = useState('')

  const handleUserTypeChange = (value) => {
    setSelectedUserType(value)
  }

  return (
    <Form form={form} name='add-message' onFinish={onFinish}>
      <Row wrap={false} gutter={24}>
        <Col span={isScreenSmall ? 24 : 12}>
          <CustomInput
            label={lang?.message_pg?.modals?.to}
            name='to'
            type='select-multiple'
            rules={requiredField('user')}
            placeholder='Please select'
            style={{
              width: '100%',
            }}
            onChange={handleUserTypeChange}
            options={userType(role).isAdmin ? usersofAdmin : users}
          />
        </Col>
        <Col span={isScreenSmall ? 24 : 12}>
          <CustomInput
            label={lang?.message_pg?.modals?.messageType}
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
      {selectedUserType.includes('STUDENT') && (
        <Row align='middle' wrap={false} gutter={24} className='opacity-60'>
          <Col className='w-[50%]'>
            <CustomInput
              label={lang?.students_pg?.modals?.class}
              name='placeHolderClassroomId'
              type='select'
              placeholder='Please select'
              onChange={handleClassroomChange}
              isLoading={isClassLoading}
              options={classList}
            />
          </Col>

          <Col className='w-[50%]'>
            <CustomInput
              label={lang?.students_pg?.modals?.stream}
              name='streamIds'
              type='select-multiple'
              isLoading={isStreamLoading}
              options={streamsList}
              rules={requiredField('Stream')}
            />
          </Col>
        </Row>
      )}
    </Form>
  )
}

NewMessageForm.propTypes = {
  onFinish: PropTypes.func,
  form: PropTypes.object,
}

export default NewMessageForm
