import React, { useState } from "react";
import Table from "antd/lib/table";
import CustomButton from "../Shared/CustomButton";


const { Column } = Table

const PositionTable = ({
  positions,
  isFetching,
  lang,
}) => {
  return <>
    <Table
      className="data_table"
      dataSource={positions?.payload?.items}
      rowKey={(record) => {
        return record?.id;
      }}
      rowClassName="shadow"
      pagination={false}
      loading={isFetching}
      bordered={false}
      scroll={{ x: 0 }}
    >
      <Column
        title="#"
        key="#"
        width={24}
        render={(text, record, index) => (
          <span className="text-gray-500">{index + 1}.</span>
        )}
      />

      <Column
        title={lang?.fees_pg?.table?.name}
        key="name"
        render={(record) => (
          <span className="font-bold">{record?.name}</span>
        )}
      />

      <Column
        title={"total employees with position"}
        key="User"
        render={(record) => (
          <span>
            {record?.User?.length}
          </span>
        )}
      />


      <Column
        title={lang?.fees_pg?.table?.actions}
        key="actions"
        width={200}
        render={(record) => (
          <div className="flex gap-4">
            <CustomButton type="edit" >
              {lang?.dashboard_shared?.buttons?.edit}
            </CustomButton>

            <CustomButton
              type="delete"
              
            >
              {lang?.dashboard_shared?.buttons?.delete}
            </CustomButton>
          </div>
        )}
      />
    </Table>
  </>
}

export default PositionTable;