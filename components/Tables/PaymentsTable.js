import Table from 'antd/lib/table'
import { toPng } from 'html-to-image'
import { jsPDF } from 'jspdf'
import moment from 'moment'
import QRCode from "qrcode.react"
import React, { useRef, useState } from 'react'
import { toLocalString } from '../../helpers/numbers'
import userType from '../../helpers/userType'
import CustomButton from '../Shared/CustomButton'
import CustomImage from '../Shared/CustomImage'
import CustomModal from '../Shared/CustomModal'
import PaymentsTableMobile from './Mobile/PaymentsTableMobile'



const { Column } = Table

const PaymentHistoryTable = ({
  data,
  isFetching,
  lang,
  isScreenSmall,
  profile,
  role
}) => {

  const [receipt, setReceipt] = useState(false)
  const [fee, setFee] = useState(null)

  const ref = useRef()

  const handleReceipt = (fees) => {
    setReceipt(!receipt)
    setFee(fees)
  }


  const handleDownloadPDF = async () => {
    const image = await toPng(ref.current)
    const pdf = new jsPDF()
    pdf.addImage(image, 'PNG', 10, 10, 190, 0)
    pdf.save(`${profile?.payload?.fullName} receipt`)
  }

  return (
    <>
    <CustomModal
        isVisible={receipt}
        setIsVisible={setReceipt}
        width={700}
        handleCancel={setReceipt}
        title={'Download receipt'}
        footerContent={
          <div>
            <CustomButton type='primary' onClick={handleDownloadPDF}>
              Download
            </CustomButton>
          </div>
        }
      >
        <div className='w-100%  border p-5' ref={ref}>
          <div className='flex justify-center'>
            <CustomImage src='/icons/logo.png' className='mb-12' width={200} />
          </div>
          <div className='mt-3 flex justify-between items-center mb-5 w-[50%] mx-auto' >
            <p className='text-base'>School</p>
            <p className='font-bold text-base text-dark ' > {profile?.payload?.school?.schoolName} </p>
          </div>
          <div className='mb-9 w-[50%] mx-auto'>
            <h1 className=' font-bold text-xl text-dark  text-center mb-5'>
              Student
            </h1>
            <div className='flex justify-between items-center mb-3'>
              <p className=' font-bold text-base text-dark  '>
                {profile?.payload?.fullName}
              </p>
            </div>
            <div className='flex justify-between items-center mb-3'>
              <p>Year</p>
              <p className=' font-bold  text-dark  '>
                {profile?.payload?.academicYear?.name}{' '}
              </p>
            </div>
            <div className='flex justify-between items-center mb-3'>
              <p>Term</p>
              <p className=' font-bold  text-dark  '>
                {profile?.payload?.academicTerm}{' '}
              </p>
            </div>
            <div className='flex justify-between items-center mb-3'>
              <p>Class</p>
              <p className=' font-bold  text-dark  '>
                {profile?.payload?.stream?.classroom?.name}{' '}
              </p>
            </div>
            <div className='flex justify-between items-center mb-3'>
              <p>Stream</p>
              <p className=' font-bold  text-dark  '>
                {profile?.payload?.stream?.name}{' '}
              </p>
            </div>
          </div>
          <div></div>
          <div className='w-[50%] mx-auto'>
            <h1 className=' font-bold text-xl text-dark  text-center mb-5'>
              Fee details
            </h1>
            <div className='flex justify-between items-center mb-4'>
              <p>Name</p>
              <p className='font-bold'>{fee?.fee?.name}</p>
            </div>
            <div className='flex justify-between items-center mb-4'>
              <p>Type</p>
              <p
                className={`bg-gray-200 px-2 py-[4px] rounded ${fee?.fee?.type === 'School fee' && 'font-medium bg-edit_bg'
                  } ${fee?.fee?.type === 'Optional' && 'bg-gray-200 text-gray-400'}`}
              >
                {fee?.fee?.type}
              </p>
            </div>
            <div className='flex justify-between items-center mb-4'>
              <p>Amount</p>
              <p className='text-black font-semibold'>
                {toLocalString(fee?.fee?.amount)} Rwf
              </p>
            </div>
            <div className='flex justify-between items-center mb-4'>
              <p>Paid</p>
              <p className='text-edit_blue font-medium'>
                {toLocalString(fee?.amount)} RWf
              </p>
            </div>
            <div className='mb-4 mt-4 w-[50%] mx-auto' >
              <QRCode
                value="https://www.tutorialspoint.com/"  />
            </div>
          </div>
        </div>
      </CustomModal>
      {isScreenSmall ? <PaymentsTableMobile lang={lang} loading={isFetching} dataSource={data?.payload?.items} /> :
        <Table
          className='data_table'
          dataSource={data?.payload?.items}
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
            title={lang?.students_pg?.profile?.paymentTable?.date}
            key='date'
            render={(record) => <span className='font-bold'>{moment(record?.date).format('YYYY-MM-DD')}</span>}
          />

          <Column
            title={lang?.students_pg?.profile?.paymentTable?.term}
            key='academicTerm'
            render={(record) => (
              <span className='font-bold'>{record?.academicTerm}</span>
            )}
          />

          <Column
            title={lang?.students_pg?.profile?.paymentTable?.amount}
            key='amount'
            render={(record) => (
              <span>{toLocalString(record?.amount || 0)} Rwf</span>
            )}
          />

          <Column
            title={lang?.students_pg?.profile?.paymentTable?.method}
            key='paymentMethod'
            render={(record) => (
              <span className='text-black font-semibold'>
                {record?.paymentMethod}
              </span>
            )}
          />
          <Column
            title={lang?.students_pg?.profile?.paymentTable?.status}
            key='status'
            render={(record) => <span className={` p-3 rounded font-medium  ${record?.status==='PENDING' ? "text-black bg-edit_bg ":record?.status==="SUCCESS"?"text-white bg-[#198754] ":"text-white bg-[#ff0000]"}`} >{record?.status}</span>}

          />

          {(userType(role).isStudent || userType(role).isParent) && (
            <Column
              title={'Receipt'}
              key='actions'
              width={10}
              render={(record) =>
                (record?.status==="SUCCESS") ? (
                  <>
                    <CustomButton
                      type='edit'
                      onClick={() => handleReceipt(record)}
                    >
                      receipt
                    </CustomButton>
                  </>
                ) : null
              }
            />
          )}

        </Table>}
    </>
  )
}

export default PaymentHistoryTable
