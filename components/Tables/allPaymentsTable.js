import Table from 'antd/lib/table'
import React from 'react'
import CustomButton from '../Shared/CustomButton'
import moment from 'moment'
import { toLocalString } from '../../helpers/numbers'

const { Column } = Table

const AllPaymentsTable = ({ payments, isFetching, lang }) => {
  return (
    <>
      <Table
        className='data_table'
        dataSource={payments?.payload?.items}
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
          render={(record) => (
            <span className='font-bold'>
              {moment(record?.date).format('YYYY-MM-DD')}
            </span>
          )}
        />
        <Column
          title={lang?.fees_pg?.table?.name}
          key='student'
          render={(record) => (
            <span className='font-bold'>{record?.student?.fullName}</span>
          )}
        />

        <Column
          title={lang?.fees_pg?.table?.year}
          key='year'
          render={(record) => <span>{record?.academicYear?.name}</span>}
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
          render={(record) => (
            <span
              className={` p-3 rounded font-medium  ${
                record?.status === 'PENDING'
                  ? 'text-black bg-edit_bg '
                  : record?.status === 'SUCCESS'
                  ? 'text-white bg-[#198754] '
                  : 'text-white bg-[#ff0000]'
              }`}
            >
              {record?.status}
            </span>
          )}
        />
      </Table>
    </>
  )
}

export default AllPaymentsTable
