import { LoadingOutlined } from '@ant-design/icons'
import Col from 'antd/lib/col'
import Form from 'antd/lib/form'
import Row from 'antd/lib/row'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import countries_with_codes from '../../config/countries_with_codes'
import requiredField from '../../helpers/requiredField'
import { useWindowSize } from '../../helpers/useWindowSize'
import { useGetSchoolProfileQuery } from '../../lib/api/Schools/schoolsEndpoints'
import { useLazyGetPositionsQuery,useGetPositionsQuery } from '../../lib/api/positions/positionEndpoints'
import CustomImage from '../Shared/CustomImage'
import CustomInput from '../Shared/CustomInput'
import { _pagination_number_ } from '../../config/constants'


const NewEmployeeForm = ({
  onFinish,
  form,
  uploadLoading,
  handleUploadProfile,
  setSelectedCountry,
  imgURL,
	setPositionId,positionId
}) => {
  const { data: positions, isFetching: isPositionLoading } =
	useGetPositionsQuery({
    page: 0,
    size: _pagination_number_,
    search:"",
  })

	const { data: schoolProfile, isLoading } = useGetSchoolProfileQuery();	
  const lang = useSelector((state) => state?.translation?.payload)



  const positionsList = positions?.payload?.items?.length
    ? [
        ...positions?.payload?.items?.map((item) => ({
          key: item?.id,
          value: item?.id,
          label: item.name,
        })),
      ]
    : []

  const handleCountryChange = (country) => {
    setSelectedCountry(countries_with_codes?.find((c) => c.name === country))
  }

  const handlePositionChange = (value) => {
    setPositionId(value)
  }

  const { width } = useWindowSize()
  const isScreenSmall = width <= 1024

  return (
    <Form form={form} name='add-employee' onFinish={onFinish}>
      <p className='text-gray-300 mb-4'>
        {lang?.students_pg?.modals?.personal_info}
      </p>

      <Row align='middle' wrap={false} gutter={24}>
        <Col className='w-[100%]'>
          <CustomInput
            label={lang?.students_pg?.modals?.full_name}
            placeholder={`${lang?.students_pg?.modals?.full_name}...`}
            name='employeeFullName'
            rules={requiredField('Full name')}
          />
        </Col>
      </Row>

      <Row align='middle' wrap={isScreenSmall} gutter={24}>
        <Col className={`${isScreenSmall ? 'w-[100%]' : 'w-[50%]'}`}>
          <CustomInput
            label={lang?.students_pg?.modals?.gender}
            type='select'
            name='employeeGender'
            options={[
              { key: 'null', value: '', label: 'Select gender' },
              { key: 'Male', value: 'MALE', label: 'Male' },
              { key: 'Female', value: 'FEMALE', label: 'Female' },
            ]}
            defaultValue=''
            rules={requiredField('Gender')}
          />
        </Col>

        <Col className={`${isScreenSmall ? 'w-[100%]' : 'w-[50%]'}`}>
          <CustomInput
            label={lang?.students_pg?.modals?.dob}
            type='date'
            name='employeeDob'
            rules={requiredField('DOB')}
          />
        </Col>
      </Row>

      <Row
        align={`${imgURL && !uploadLoading ? 'top' : 'middle'}`}
        wrap={false}
        gutter={24}
      >
        <Col flex={1}>
          <CustomInput
            label={lang?.students_pg?.modals?.profile}
            type='file'
            placeholder='Select to upload'
            name='employeePassportPhoto'
            inputType='file'
            isLoading={uploadLoading}
            onChange={handleUploadProfile}
          />
        </Col>

        {(uploadLoading || imgURL) && (
          <Col>
            {uploadLoading ? (
              <LoadingOutlined
                style={{ fontSize: 24, marginTop: '16px' }}
                spin
              />
            ) : (
              imgURL && (
                <CustomImage
                  src={imgURL}
                  width={38}
                  height={38}
                  className='object-cover mt-[32px] rounded'
                />
              )
            )}
          </Col>
        )}
      </Row>

      <p className='text-gray-300 my-4'>
        {lang?.students_pg?.modals?.contact_info}
      </p>

      <Row align='middle' wrap={isScreenSmall} gutter={24}>
        <Col className={`${isScreenSmall ? 'w-[100%]' : 'w-[50%]'}`}>
          <CustomInput
            label={lang?.students_pg?.modals?.email}
            placeholder='example@company.domain'
            name='employeeEmail'
            rules={requiredField('Email')}
          />
        </Col>

        <Col className={`${isScreenSmall ? 'w-[100%]' : 'w-[50%]'}`}>
          <CustomInput
            label={lang?.students_pg?.modals?.address}
            placeholder={`${lang?.students_pg?.modals?.address}...`}
            name='address'
            rules={requiredField('Address')}
          />
        </Col>
      </Row>

      <Row align='middle' wrap={isScreenSmall} gutter={24}>
        <Col className={`${isScreenSmall ? 'w-[100%]' : 'w-[50%]'}`}>
          <CustomInput
            label={'residence'}
            placeholder='Select country'
            type='select'
            name='countryName'
            showSearch={true}
            onChange={handleCountryChange}
            options={countries_with_codes?.map((country) => ({
              ...country,
              index: country?.name,
              value: country?.name,
              key: country?.name,
            }))}
            rules={requiredField('Country')}
          />
        </Col>

        <Col className={`${isScreenSmall ? 'w-[100%]' : 'w-[50%]'}`}>
          <CustomInput
            label={'Phone'}
            placeholder={`Phone...`}
            name='employeeContactPhone'
            rules={requiredField('phone')}
          />
        </Col>
      </Row>

      <Row align='middle' wrap={isScreenSmall} gutter={24}></Row>

      <p className='text-gray-300 my-4'>Employment info</p>

      {schoolProfile?.payload?.hasStudentIds && (
        <Row align='middle' wrap={false} gutter={24}>
          <Col className='w-[100%]'>
            <CustomInput
              placeholder={lang?.students_pg?.modals?.student_identifier}
              name='employeeIdentifier'
              label={`${lang?.students_pg?.modals?.student_identifier}...`}
              isLoading={isLoading}
              rules={requiredField('Employee identifier')}
            />
          </Col>
        </Row>
      )}
      <Row align='middle' wrap={isScreenSmall} gutter={24}>
        <Col className={`${isScreenSmall ? 'w-[100%]' : 'w-[50%]'}`}>
          <CustomInput
            label={'from'}
            type='date'
            name='from'
            rules={requiredField('from')}
          />
        </Col>
        <Col className={`${isScreenSmall ? 'w-[100%]' : 'w-[50%]'}`}>
          <CustomInput
            label={'to'}
            type='date'
            name='to'
            rules={requiredField('to')}
          />
        </Col>
      </Row>
      <Row align='middle' wrap={isScreenSmall} gutter={24}>
        <Col className={`${isScreenSmall ? 'w-[100%]' : 'w-[50%]'}`}>
          <CustomInput
            onChange={handlePositionChange}
            value={positionId}
            type='select'
            label={"position"}
            options={[
              {
                key: 0,
                value: '',
                label: "Select position",
              },
              ...positionsList,
            ]}
            isLoading={isPositionLoading}
          />
        </Col>
        <Col className={`${isScreenSmall ? 'w-[100%]' : 'w-[50%]'}`}>
          <CustomInput
            label={'Account Number'}
            placeholder={`Account Number...`}
            name='AccountNumber'
            rules={requiredField('Account number')}
          />
        </Col>
      </Row>
      <Row align='middle' wrap={isScreenSmall} gutter={24}>
        <Col className={`${isScreenSmall ? 'w-[100%]' : 'w-[50%]'}`}>
          <CustomInput
            label={'enumaration'}
            type='select'
            name='enumaration'
            options={[
              { key: 'null', value: '', label: 'Select enumaration' },
              { key: 'Salary', value: 'SALARY', label: 'Salary' },
              { key: 'wages', value: 'WAGES', label: 'Wages' },
            ]}
            defaultValue=''
            rules={requiredField('enumaration')}
          />
        </Col>
        <Col className={`${isScreenSmall ? 'w-[100%]' : 'w-[50%]'}`}>
          <CustomInput
            placeholder={'amount'}
            name='amount'
            label={`amount...`}
            rules={requiredField('amount')}
          />
        </Col>
      </Row>
    </Form>
  )
}

NewEmployeeForm.propTypes = {
  onFinish: PropTypes.func,
  form: PropTypes.object,
  uploadLoading: PropTypes.bool,
  handleUploadProfile: PropTypes.func,
  setSelectedCountry: PropTypes.func,
  itemToEdit: PropTypes.any,
	setPositionId:PropTypes.any,
	positionId:PropTypes.string
}

export default NewEmployeeForm
