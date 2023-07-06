import React, { useState } from 'react'
import Table from 'antd/lib/table'
import CustomButton from '../Shared/CustomButton'
import { toLocalString } from '../../helpers/numbers'
import userType from '../../helpers/userType'

const { Column } = Table

const InstallmentTable = ({ installments, isFetching, lang, role }) => {
  return (
    <>
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
          title='name'
          key='fee'
          render={(text, record, index) => (
            <span className='text-gray-500'>{record?.fee?.name}</span>
          )}
        />
        <Column
          title='type'
          key='fee'
          render={(text, record, index) => (
            <span className='text-gray-500'>{record?.fee?.type}</span>
          )}
        />
        <Column
          title='installments'
          key='installmentNumber'
          
          render={(text, record, index) => (
            <span className='text-gray-500'>{record?.installmentNumber}</span>
          )}
        />
        <Column
          title='Minimum amount'
          key='minimumAmount'
          
          render={(text, record, index) => (
            <span className='text-gray-500'>{Math.round(record?.minimumAmount)}</span>
          )}
        />
        <Column
          title={lang?.fees_pg?.table?.actions}
          key='actions'
          width={200}
          render={(record) => (
            <div className='flex gap-4'>
              <CustomButton type='edit'>
                {lang?.dashboard_shared?.buttons?.edit}
              </CustomButton>

              <CustomButton type='delete'>
                {lang?.dashboard_shared?.buttons?.delete}
              </CustomButton>
            </div>
          )}
        />
      </Table>
    </>
  )
}

export default InstallmentTable
