import Form from 'antd/lib/form'
import Table from 'antd/lib/table'
import React, { useState } from 'react'
import handleAPIRequests from '../../helpers/handleAPIRequests'
import { toLocalString } from '../../helpers/numbers'
import userType from '../../helpers/userType'
import { useManualPayMutation } from '../../lib/api/Students/studentsEndpoints'
import ManualPaymentForm from '../Forms/ManualPaymentForm'
import ThirdPartyPayment from '../Forms/ThirdPartyPayment'
import CustomButton from '../Shared/CustomButton'
import CustomImage from '../Shared/CustomImage'
import CustomModal from '../Shared/CustomModal'
import Notify from '../Shared/Notification'
import AssignedFeesTableMobile from './Mobile/AssignedFeesTableMobile'

const { Column } = Table

const AssignedFeesTable = ({
  data,
  isFetching,
  lang,
  isScreenSmall,
  studentId,
  role,
  country,
  paymentObject,
  profile,
}) => {
  const [isPayModalVisible, setIsPayModalVisible] = useState(false)
  const [activeFee, setActiveFee] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('')
  const [isPayMethodModalVisible, setIsPayMethodModalVisible] = useState(false)
  const [secretKey, setSecretKey] = useState('')
  const [hasPayed, setHasPayed] = useState(false)
  const [Amount,setAmount]=useState('')

  const [form] = Form.useForm()

  const [manualPay, { isLoading }] = useManualPayMutation()

  const handleCancel = (res) => {
    setActiveFee(null)
    setIsPayModalVisible(false)
    if(paymentMethod==="STRIPE"){
      res && setSecretKey(res.payload)
      console.log({res})
    }
    form.resetFields()
    if(paymentMethod==="SPENN"||paymentMethod==="MTN"){
      setIsPayMethodModalVisible(false)
    }
  }



  const cancelPayment = () => {
    setIsPayMethodModalVisible(!isPayMethodModalVisible)
  }

  const handleManualPayment = (fee) => {
    setActiveFee(fee)
    setIsPayModalVisible(true)
  }

 

  const onManualPaymentFinish = async (values) => {
    if (values.amount <= 0) {
      Notify({
        type: 'error',
        message: 'Error',
        description: lang?.students_pg?.modals?.valid_err,
      })
      return
    }
    if (values.amount > parseInt(activeFee?.remaining)) {
      Notify({
        type: 'error',
        message: 'Error',
        description: lang?.students_pg?.modals?.big_amount,
      })
      return
    }
    setAmount(values.amount)
    const data = {
      ...values,
      amount: +values?.amount,
      ...paymentObject,
      country,
      currency: country === 'Rwanda' ? 'Rwf' : '',
      date: new Date(),
    }

    handleAPIRequests({
      request: manualPay,
      paymentMethod,
      notify: true,
      onSuccess: handleCancel,
      studentId,
      feeId: activeFee?.id,
      ...data,
    })
  }

 

  return (
    <>
      <CustomModal
        isVisible={isPayModalVisible}
        setIsVisible={setIsPayModalVisible}
        loading={isLoading}
        width={700}
        handleCancel={handleCancel}
        title={lang?.students_pg?.modals?.pay_method}
      >
        <ThirdPartyPayment
          setPaymentMethod={setPaymentMethod}
          setIsPayModalVisible={setIsPayModalVisible}
          setIsPayMethodModalVisible={setIsPayMethodModalVisible}
          country={country}
        />
      </CustomModal>
      <CustomModal
        isVisible={isPayMethodModalVisible}
        setIsVisible={setIsPayMethodModalVisible}
        loading={isLoading}
        width={700}
        handleCancel={cancelPayment}
        title={lang?.students_pg?.modals?.pay_manual}
        footerContent={
          secretKey ? null : (
            <CustomButton
              loading={isLoading}
              type='primary'
              htmlType='submit'
              form='manual-payment'
            >
              {lang?.dashboard_shared?.buttons?.save}
            </CustomButton>
          )
        }
      >
        <ManualPaymentForm
          form={form}
          onFinish={onManualPaymentFinish}
          lang={lang}
          payMethod={paymentMethod}
          secretKey={secretKey}
          setHasPayed={setHasPayed}
          setIsPayMethodModalVisible={setIsPayMethodModalVisible}
        />
      </CustomModal>

      <CustomModal
        isVisible={hasPayed}
        setIsVisible={setHasPayed}
        width={700}
        handleCancel={setHasPayed}
        title={"Payment sucess"}
        footerContent={
          <CustomButton
            type='primary'
            onClick={() => {setActiveFee(null);setHasPayed(false)}}
          >
            Ok
          </CustomButton>
        }
      >
        <div className='w-full'>
          <div className='flex justify-center'>
            <CustomImage
              src='/icons/check_mark.png'
              className='mb-12'
              width={200}
            />
          </div>
          <div className='flex justify-center'>
            <h1 className='font-bold text-xl text-dark  text-center mb-5'>Successfull paid {Amount} RWF </h1>
          </div>
        </div>
      </CustomModal>
      

      {isScreenSmall ? (
        <AssignedFeesTableMobile
          dataSource={data?.payload}
          lang={lang}
          loading={isFetching}
          handleManualPayment={handleManualPayment}
        />
      ) : (
        <Table
          className='data_table'
          dataSource={data?.payload}
          rowKey={(record) => {
            return record?.id
          }}
          rowClassName='shadow'
          pagination={false}
          bordered={false}
          loading={isFetching}
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
            title={lang?.students_pg?.profile?.table?.fee_name}
            key='name'
            render={(record) => (
              <span className='font-bold'>{record.name}</span>
            )}
          />

          <Column
            title={lang?.students_pg?.profile?.table?.fee_type}
            key='type'
            render={(record) => (
              <span
                className={`bg-gray-200 px-2 py-[4px] rounded ${record.type === 'School fee' && 'font-medium bg-edit_bg'
                  } ${record.type === 'Optional' && 'bg-gray-200 text-gray-400'}`}
              >
                {record?.type?.replace('_', ' ')}
              </span>
            )}
          />

          <Column
            title={lang?.students_pg?.profile?.table?.amount}
            key='amount'
            render={(record) => (
              <span className='text-black font-semibold'>
                {toLocalString(record.amount)} Rwf
              </span>
            )}
          />

          <Column
            title={lang?.students_pg?.profile?.table?.paid}
            key='paid'
            render={(record) => (
              <span className='text-edit_blue font-medium'>
                {toLocalString(record.paid)} Rwf
              </span>
            )}
          />

          <Column
            title={lang?.students_pg?.profile?.table?.remaining}
            key='remaining'
            render={(record) => (
              <span className='text-red font-medium'>
                {toLocalString(record.remaining)} Rwf
              </span>
            )}
          />

          {(userType(role).isStudent || userType(role).isParent) && (
            <Column
              title={lang?.students_pg?.profile?.table?.actions}
              key='actions'
              width={100}
              render={(record) => (
                <>
                  {parseInt(record?.amount) > parseInt(record?.paid) ?
                    <CustomButton
                      type='edit'
                      onClick={() => handleManualPayment(record)}
                    >
                      {lang?.dashboard_shared?.buttons?.pay}
                    </CustomButton> : null}
                </>
              )}
            />
          )}
        </Table>
      )}
    </>
  )
}

export default AssignedFeesTable
