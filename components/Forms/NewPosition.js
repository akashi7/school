import Col from 'antd/lib/col'
import Form from 'antd/lib/form'
import Row from 'antd/lib/row'
import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import requiredField from '../../helpers/requiredField'
import { useWindowSize } from '../../helpers/useWindowSize'
import CustomInput from '../Shared/CustomInput'

const NewPositionForm = ({ onFinish, form }) => {
  const lang = useSelector((state) => state?.translation?.payload)
  const { width } = useWindowSize()
  const isScreenSmall = width <= 1024
  return (
    <Form form={form} name='add-position' onFinish={onFinish}>
      <Row wrap={false} gutter={24}>
        <Col className='w-[100%]'>
          <CustomInput
            label={'Position name'}
            placeholder={`Position name...`}
            name='positionName'
            rules={requiredField('position name')}
          />
        </Col>
      </Row>
    </Form>
  )
}

NewPositionForm.propTypes = {
  onFinish: PropTypes.func,
  form: PropTypes.object,
}

export default NewPositionForm
