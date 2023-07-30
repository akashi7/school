import Table from 'antd/lib/table'
import React from 'react'
import { toLocalString } from '../../helpers/numbers'
import userType from '../../helpers/userType'
import CustomButton from '../Shared/CustomButton'

const { Column } = Table

const DeductibleTypesTable = ({ deductiblesTypes, isFetching, lang, role,isView }) => {
  return (
    <>
      <Table
        className='data_table'
        dataSource={deductiblesTypes?.payload?.items}
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
          title={"enumaration"}
          key='enumaration'
          render={(record) => (
            <span className='font-bold'>{record?.enumaration}</span>
          )}
        />

        <Column
          title={'type'}
          key='type'
          render={(record) => <span className='font-bold'>{record?.type}</span>}
        />

        <Column
          title={'amount'}
          key='amount'
          render={(record) => (
            <span className='font-bold'>
              {record?.type === 'FLAT'
                ? toLocalString(record?.amount) + ' Rwf'
                : toLocalString(record?.amount) + ' %'}
            </span>
          )}
        />
        {(userType(role).isSchool) && (isView) &&  (
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
        )}
      </Table>
    </>
  )
}

export default DeductibleTypesTable
