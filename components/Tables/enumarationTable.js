import React, { useState } from 'react'
import Table from 'antd/lib/table'
import CustomButton from '../Shared/CustomButton'
import moment from 'moment'

const { Column } = Table

const EnumarationTable = ({ enumaration, isFetching, lang }) => {
  return (
    <>
      <Table
        className='data_table'
        dataSource={enumaration}
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
          title={lang?.fees_pg?.table?.name}
          key='name'
          render={(record) => <span className='font-bold'>{record?.name}</span>}
        />

        <Column
          title={'From'}
          key='from'
          render={(record) => <span>{moment(record?.from).format("YYYY-MM-DD")}</span>}
        />

        <Column
          title={'To'}
          key='to'
          render={(record) => <span>{moment(record?.to).format("YYYY-MM-DD")}</span>}
        />

        <Column
          title={'Amount'}
          key='amount'
          render={(record) => <span>{record?.amount}</span>}
        />

        {/* <Column
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
        /> */}
      </Table>
    </>
  )
}

export default EnumarationTable
