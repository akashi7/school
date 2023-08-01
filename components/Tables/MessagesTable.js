import Table from 'antd/lib/table'
import moment from 'moment'
import React from 'react'

const { Column } = Table

const MessagesTable = ({ messages, isFetching, lang }) => {
  return (
    <>
      <Table
        className='data_table'
        dataSource={messages?.payload?.items}
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
          title={lang?.message_pg?.table?.Date}
          key='createdAt'
          render={(record) => (
            <span className='font-bold'>
              {moment(record?.createdAt).format('YYYY/MM/DD')}
            </span>
          )}
        />

        <Column
          title={lang?.message_pg?.table?.SentTo}
          key='to'
          render={(record) => (
            <span>{record?.to?.map((role) => `${role},`)}</span>
          )}
        />
        <Column
          title={lang?.message_pg?.table?.type}
          key='messageType'
          render={(record) => (
            <span>{record?.messageType?.map((type) => `${type},`)}</span>
          )}
        />

        <Column
          title={lang?.message_pg?.table?.Message}
          key='message'
          render={(record) => <span>{record?.message}</span>}
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

export default MessagesTable
