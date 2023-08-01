import Button from 'antd/lib/button'
import Col from 'antd/lib/col'
import DatePicker from 'antd/lib/date-picker'
import Form from 'antd/lib/form'
import PlusOutlined from 'antd/lib/icon'
import Input from 'antd/lib/input'
import Row from 'antd/lib/row'
import React from 'react'
import { AiOutlineMinusCircle } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import requiredField from '../../helpers/requiredField'
import CustomInput from '../Shared/CustomInput'
import { termOptions } from '../../config/constants'

const NewInstallment = ({
  onFinish,
  form,
  fees,
  isScreenSmall,
  setInstallmentNumber,
  installmentNumber,
  onChange,
}) => {
  const lang = useSelector((state) => state?.translation?.payload)


  return (
    <Form form={form} name='add-installment' onFinish={onFinish}>
      <Col className={`${!isScreenSmall ? 'w-[100%]' : 'w-[50%]'}`}>
        {fees?.payload?.items?.length >= 1 && (
          <CustomInput
            type='select'
            name='feeId'
            label={lang?.installment_pg?.modals?.fee}
            rules={requiredField('Fee')}
            options={[
              ...fees?.payload?.items?.map((item, idx) => ({
                key: idx,
                value: item?.id,
                label: item.name,
              })),
            ]}
          />
        )}
      </Col>
      <Col className={`w-full`}>
        <CustomInput
          label={lang?.students_pg?.modals?.term}
          type='select'
          name='academicTerm'
          options={[...termOptions]}
          placeholder='Select term'
          rules={requiredField('Term')}
        />
      </Col>
      <Col className={`${!isScreenSmall ? 'w-[100%]' : 'w-[50%]'}`}>
        <CustomInput
          label={lang?.installment_pg?.modals?.number}
          placeholder={`${lang?.installment_pg?.modals?.number}...`}
          name='installmentNumber'
          inputType='number'
          rules={requiredField('Installment number')}
          onChange={(e) => {
            onChange(e)
          }}
        />
      </Col>
      <Col className={`${!isScreenSmall ? 'w-[100%]' : 'w-[50%]'}`}>
        <CustomInput
          label={lang?.installment_pg?.modals?.reason}
          placeholder={`${lang?.installment_pg?.modals?.reason}`}
          name='reason'
          type='text-area'
          rules={requiredField('reason')}
        />
      </Col>
      <Form.List name={'installments'}>
        {(fields, { add, remove }) => (
          <>
            {fields.length <= installmentNumber &&
              fields.map(({ key, name, ...restField }) => (
                <Row
                  gutter={24}
                  key={key}
                  style={{
                    // display: 'flex',
                    marginBottom: 2,
                    marginTop: 5,
                    width: '100%',
                  }}
                  align='baseline'
                >
                  <div className='flex flex-row items-center  w-full '>
                    <Col className=''>
                      <Form.Item
                        name={[name, 'date']}
                        rules={[{ required: true, message: 'Missing date' }]}
                        {...restField}
                        className='w-full'
                      >
                        <DatePicker
                          type={'date'}
                          placeholder={lang?.installment_pg?.modals?.date}
                          className='rounded h-[40px] w-[100%] mt-3'
                        />
                      </Form.Item>
                    </Col>
                    <Col className=''>
                      <Form.Item
                        name={[name, 'amount']}
                        rules={[{ required: true, message: 'Missing amount' }]}
                        {...restField}
                        className='w-full'
                      >
                        <Input
                          placeholder={lang?.installment_pg?.modals?.amount}
                          className={`rounded h-[40px] w-[100%] mt-3`}
                          type='number'
                        />
                      </Form.Item>
                    </Col>
                    <Col className=' '>
                      <AiOutlineMinusCircle
                        onClick={() => remove(name)}
                        // width={100}
                        className='h-[40px] w-full cursor-pointer'
                      />
                    </Col>
                  </div>
                </Row>
              ))}
            <Form.Item>
              {installmentNumber > 0 && fields.length < installmentNumber && (
                <Button
                  type='dashed'
                  className='mt-3'
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  {lang?.installment_pg?.add_btn}
                </Button>
              )}
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  )
}

export default NewInstallment
