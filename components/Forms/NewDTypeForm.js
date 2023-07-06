import { LoadingOutlined } from '@ant-design/icons'
import Col from 'antd/lib/col'
import Form from 'antd/lib/form'
import Row from 'antd/lib/row'
import PropTypes from 'prop-types'
import React from 'react'
import Checkbox from 'antd/lib/checkbox'
import { useSelector } from 'react-redux'
import countries_with_codes from '../../config/countries_with_codes'
import requiredField from '../../helpers/requiredField'
import { useWindowSize } from '../../helpers/useWindowSize'
import { useGetSchoolProfileQuery } from '../../lib/api/Schools/schoolsEndpoints'
import { useGetDeductibleTypesQuery } from '../../lib/api/deductibletypes/DeductibleTypesEndpoints'

import CustomImage from '../Shared/CustomImage'
import CustomInput from '../Shared/CustomInput'

const NewDTypeForm = ({ onFinish, form, handleIsOptional, isOptional }) => {
  const lang = useSelector((state) => state?.translation?.payload)

  
  const { width } = useWindowSize()
  const isScreenSmall = width <= 1024
  return (
    <Form form={form} name='add-d-type' onFinish={onFinish}>
      <Row wrap={false} gutter={24}>
        <Col className={`${isScreenSmall ? 'w-[100%]' : 'w-[50%]'}`}>
          <CustomInput
            label={'name'}
            placeholder={`name...`}
            name='name'
            rules={requiredField('name')}
          />
        </Col>
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
      </Row>
      <Row gutter={24} className='mt-6'>
        <Col className={`${isScreenSmall ? 'w-[100%]' : 'w-[50%]'}`}>
          <CustomInput
            label={'type'}
            type='select'
            name='type'
            options={[
              { key: 'null', value: '', label: 'Select type' },
              { key: 'Flat', value: 'FLAT', label: 'Flat' },
              { key: 'Percentage', value: 'PERCENTAGE', label: 'Percentage' },
            ]}
            defaultValue=''
            rules={requiredField('enumaration')}
          />
        </Col>
        <Col className={`${isScreenSmall ? 'w-[100%]' : 'w-[50%]'}`}>
          <CustomInput
            label={'amount'}
            placeholder={`amount...`}
            name='amount'
            rules={requiredField('amount')}
          />
        </Col>
      </Row>
      <Row gutter={24} className='mt-6'>
        <Col span={isScreenSmall ? 24 : 12} className={isScreenSmall && 'mt-2'}>
          <Checkbox
            name='optional'
            checked={isOptional}
            onChange={() => handleIsOptional()}
          >
            {'optional'}
          </Checkbox>
        </Col>
      </Row>
    </Form>
  )
}

export default NewDTypeForm
