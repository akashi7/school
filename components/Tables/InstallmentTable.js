import Col from 'antd/lib/col'
import Form from 'antd/lib/form'
import Table from 'antd/lib/table'
import moment from 'moment'
import React, { useState } from 'react'
import handleAPIRequests from '../../helpers/handleAPIRequests'
import requiredField from '../../helpers/requiredField'
import userType from '../../helpers/userType'
import { useResponseInstallmentMutation } from '../../lib/api/installments/InstallmentEndpoints'
import CustomButton from '../Shared/CustomButton'
import CustomInput from '../Shared/CustomInput'
import CustomModal from '../Shared/CustomModal'

const { Column } = Table

const InstallmentTable = ({ installments, isFetching, lang, role }) => {
  const [decline, setDecline] = useState(false)
  const [oneItem, setOneItem] = useState(null)

  const [visible, setIsVisible] = useState(false)
  const [form] = Form.useForm()

  const handleCancelModal = () => {
    setIsVisible(!visible)
    form.resetFields()
    setDecline(false)
  }

  const onSuccess = () => {
    form.resetFields()
    setIsVisible(false)
    setDecline(false)
  }

  const [responseInstallment, { isLoading: isRespondingInstallment }] =
    useResponseInstallmentMutation()

  const onFinish = (values) => {
    const data = {
      ...values,
      id: oneItem?.id,
      status: 'DECLINED',
    }
    handleAPIRequests({
      request: responseInstallment,
      notify: true,
      ...data,
      onSuccess: onSuccess,
    })
  }

  const Approve = () => {
    const data = {
      id: oneItem?.id,
      status: 'APPROVED',
    }
    handleAPIRequests({
      request: responseInstallment,
      notify: true,
      ...data,
      onSuccess: onSuccess,
    })
  }

  return (
    <>
      <CustomModal
        isVisible={visible}
        setIsVisible={() => setIsVisible(!visible)}
        loading={false}
        width={700}
        handleCancel={handleCancelModal}
        title={'installment'}
        footerContent={
          <div className='flex justify-between items-center'>
            <CustomButton
              // loading={isRespondingInstallment}
              type='primary'
              htmlType='submit'
              form='promote-student'
              bg={'bg-[#198754]'}
              onClick={() => Approve()}
            >
              {'approve'}
            </CustomButton>
            {decline ? (
              <CustomButton
                loading={isRespondingInstallment}
                type='primary'
                htmlType='submit'
                form='resolve-installment'
              >
                {'decline'}
              </CustomButton>
            ) : (
              <CustomButton
                loading={false}
                type='primary'
                htmlType='submit'
                form='promote-student'
                onClick={() => setDecline(!decline)}
              >
                {'decline'}
              </CustomButton>
            )}
          </div>
        }
      >
        <div className='mb-8'>
          <div className='mb-5'>
            <h3 className=' text-lg font-semibold text-center'>
              Installment Details
            </h3>
          </div>
          <div className='w-[80%] mx-auto'>
            <div>
              <div className='mb-3'>
                <p className='font-bold  text-dark text-base'>Student</p>
              </div>
              <div className='flex justify-between items-center'>
                <p>Name</p>
                <p className='font-semibold'> {oneItem?.student?.fullName} </p>
              </div>
            </div>
            <div>
              <div>
                <p className=' font-bold mb-4 mt-4 text-dark text-base'>Fee</p>
              </div>
              <div className='flex justify-between items-center'>
                <p>Name</p>
                <p className='font-semibold'>{oneItem?.fee?.name}</p>
              </div>
              <div className='flex justify-between items-center mt-4'>
                <p>Term</p>
                <p className='font-semibold'>{oneItem?.term}</p>
              </div>
            </div>
            <div>
              <div className='font-bold mb-4 mt-4 text-dark text-base'>
                Installment
              </div>
              <div className='flex justify-between items-center'>
                <p>Number</p>
                <p className='font-semibold'>{oneItem?.installmentNumber}</p>
              </div>
              <div className='flex justify-between items-center mt-4'>
                <p>Reason</p>
                <p className='font-semibold'>{oneItem?.reason}</p>
              </div>
              <div>
                <p className=' font-bold border-b-2 mt-4 mb-4 text-dark text-base'>
                  Payment Details
                </p>
                <div>
                  <div className='mb-5 flex justify-between items-center font-semibold'>
                    <div className='w-1/4'>ID</div>
                    <div className='w-1/4'>Date</div>
                    <div className='w-1/4'>Amount</div>
                  </div>
                  {oneItem?.installments?.map((obj, idx) => {
                    return (
                      <div
                        key={idx}
                        className='mb-5 flex justify-between items-center'
                      >
                        <div className='w-1/4'>
                          <p>{idx+1}</p>
                        </div>
                        <div className='w-1/4'>
                          <p>{moment(obj?.date).format('YYYY-MM-DD')}</p>
                        </div>
                        <div className='w-1/4'>
                          <p>{obj?.amount}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          {decline && (
            <div className='mx-auto  w-[80%] mt-7'>
              <Form form={form} name='resolve-installment' onFinish={onFinish}>
                <Col className={`w-[100%]`}>
                  <CustomInput
                    label={'Reason'}
                    placeholder={`reason`}
                    name='response'
                    type='text-area'
                    rules={requiredField('reason')}
                  />
                </Col>
              </Form>
            </div>
          )}
        </div>
      </CustomModal>
      <Table
        className='data_table'
        dataSource={installments?.payload?.items}
        rowKey={(record) => {
          return record?.id
        }}
        rowClassName='shadow'
        pagination={false}
        loading={isFetching}
        bordered={false}
        scroll={{ x: 0 }}
      >
        <Column
          title='#'
          key='#'
          width={24}
          render={(text, record, index) => (
            <span className='text-gray-500'>{index + 1}.</span>
          )}
        />
        <Column
          title='student'
          key='student'
          render={(text, record, index) => (
            <span className=' font-bold'>{record?.student?.fullName}</span>
          )}
        />
        <Column
          title='fee'
          key='fee'
          render={(text, record, index) => (
            <span className='text-gray-500'>{record?.fee?.name}</span>
          )}
        />
        {/* <Column
          title='reason'
          key='reason'
          render={(text, record, index) => (
            <span className='text-gray-500'>{record?.reason}</span>
          )}
        />
        <Column
          title='dates'
          key='installments'
          render={(text, record, index) => (
            <span className='text-gray-500'>
              {formatInstallments(record?.installments, 'date')}
            </span>
          )}
        />
        <Column
          title='installments'
          key='installments'
          render={(text, record, index) => (
            <span className='text-gray-500'>
              {formatInstallments(record?.installments, 'amount')}
            </span>
          )}
        /> */}
        <Column
          title='approved'
          key='approveStatus'
          render={(text, record, index) => (
            <span className='text-gray-500'>
              {String(record?.approveStatus)}
            </span>
          )}
        />
        <Column
          title='response'
          key='response'
          render={(text, record, index) => (
            <span className='text-gray-500'>
              {record?.response ? record?.response : 'no yet response'}
            </span>
          )}
        />
        <Column
          title='status'
          key='status'
          render={(text, record, index) => (
            <span
              className={`p-2 ${
                record?.status === 'APPROVED'
                  ? 'text-white bg-[#198754]  '
                  : record?.status === 'DECLINED'
                  ? 'text-white bg-[#ff0000]'
                  : 'text-gray-500 '
              }`}
            >
              {record?.status ? record?.status : 'Pending'}
            </span>
          )}
        />
        {userType(role).isSchool && (
          <Column
            title={lang?.fees_pg?.table?.actions}
            key='actions'
            width={200}
            render={(record) => (
              <div className='flex gap-4'>
                <CustomButton
                  type='view'
                  onClick={() => {
                    setIsVisible(!visible)
                    setOneItem(record)
                  }}
                >
                  {lang?.dashboard_shared?.buttons?.view}
                </CustomButton>
              </div>
            )}
          />
        )}
      </Table>
    </>
  )
}

export default InstallmentTable
