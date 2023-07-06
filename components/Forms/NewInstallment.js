import React, { useEffect, useState } from 'react'
import Form from 'antd/lib/form'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Checkbox from 'antd/lib/checkbox'
import CustomInput from '../Shared/CustomInput'
import requiredField from '../../helpers/requiredField'
import { termOptions } from '../../config/constants'
import { useSelector } from 'react-redux'

const NewInstallment = ({ onFinish, form, fees, isScreenSmall }) => {
  const lang = useSelector((state) => state?.translation?.payload)

  return (
    <Form form={form} name='add-installment' onFinish={onFinish}>
      <Col className={`${!isScreenSmall ? 'w-[100%]' : 'w-[50%]'}`}>
        {fees?.payload?.items?.length >= 1 && (
          <CustomInput
            type='select'
            name='feeId'
            label={'Choose Fee'}
            rules={requiredField('Fee')}
            options={[
              ...fees?.payload?.items?.map((item) => ({
                key: item?.name,
                value: item?.id,
                label: item.name,
              })),
            ]}
          />
        )}
      </Col>
      <Col className={`${!isScreenSmall ? 'w-[100%]' : 'w-[50%]'}`}>
        <CustomInput
          label={'Installment number'}
          placeholder={`Number...`}
          name='installmentNumber'
          inputType='number'
          rules={requiredField('Installment number')}
        />
      </Col>
    </Form>
  )
}

export default NewInstallment
