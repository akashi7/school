import React from "react";
import Table from "antd/lib/table";
import CustomButton from "../Shared/CustomButton";
import { toLocalString } from "../../helpers/numbers";
import AssignedFeesTableMobile from "./Mobile/AssignedFeesTableMobile";

const { Column } = Table;

const AssignedFeesTable = ({ data, isFetching, lang, isScreenSmall }) => {
	return isScreenSmall ? (
		<AssignedFeesTableMobile
			dataSource={data?.payload}
			lang={lang}
			loading={isFetching}
		/>
	) : (
		<Table
			className="data_table"
			dataSource={data?.payload}
			rowKey={(record) => {
				return record?.id;
			}}
			rowClassName="shadow"
			pagination={false}
			bordered={false}
			loading={isFetching}
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
				title={lang?.students_pg?.profile?.table?.fee_name}
				key="name"
				render={(record) => <span className="font-bold">{record.name}</span>}
			/>

			<Column
				title={lang?.students_pg?.profile?.table?.fee_type}
				key="type"
				render={(record) => (
					<span
						className={`bg-gray-200 px-2 py-[4px] rounded ${
							record.type === "School fee" && "font-medium bg-edit_bg"
						} ${record.type === "Optional" && "bg-gray-200 text-gray-400"}`}
					>
						{record?.type?.replace("_", " ")}
					</span>
				)}
			/>

			<Column
				title={lang?.students_pg?.profile?.table?.amount}
				key="amount"
				render={(record) => (
					<span className="text-black font-semibold">
						{toLocalString(record.amount)} Rwf
					</span>
				)}
			/>

			<Column
				title={lang?.students_pg?.profile?.table?.paid}
				key="paid"
				render={(record) => (
					<span className="text-edit_blue font-medium">
						{toLocalString(record.paid)} Rwf
					</span>
				)}
			/>

			<Column
				title={lang?.students_pg?.profile?.table?.remaining}
				key="remaining"
				render={(record) => (
					<span className="text-red font-medium">
						{toLocalString(record.remaining)} Rwf
					</span>
				)}
			/>

			<Column
				title={lang?.students_pg?.profile?.table?.actions}
				key="actions"
				width={100}
				render={() => (
					<CustomButton type="edit">
						{lang?.dashboard_shared?.buttons?.pay}
					</CustomButton>
				)}
			/>
		</Table>
	);
};

export default AssignedFeesTable;
