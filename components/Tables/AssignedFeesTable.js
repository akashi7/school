import React from "react";
import Table from "antd/lib/table";
import CustomButton from "../Shared/CustomButton";

const { Column } = Table;

const dumpData = [
	{
		id: 0,
		name: "Minerivari",
		type: "School fee",
		amount: "12, 00 Rwf",
		paid: "6, 500 Rwf",
		remaining: "5, 500 Rwf",
	},

	{
		id: 1,
		name: "Food money",
		type: "Optional",
		amount: "12, 00 Rwf",
		paid: "6, 500 Rwf",
		remaining: "5, 500 Rwf",
	},

	{
		id: 2,
		name: "Uniform money",
		type: "Mandatory",
		amount: "12, 00 Rwf",
		paid: "6, 500 Rwf",
		remaining: "5, 500 Rwf",
	},

	{
		id: 3,
		name: "Minerivari",
		type: "School fee",
		amount: "12, 00 Rwf",
		paid: "6, 500 Rwf",
		remaining: "5, 500 Rwf",
	},

	{
		id: 4,
		name: "Food money",
		type: "Optional",
		amount: "12, 00 Rwf",
		paid: "6, 500 Rwf",
		remaining: "5, 500 Rwf",
	},

	{
		id: 5,
		name: "Uniform money",
		type: "Mandatory",
		amount: "12, 00 Rwf",
		paid: "6, 500 Rwf",
		remaining: "5, 500 Rwf",
	},

	{
		id: 6,
		name: "Uniform money",
		type: "Mandatory",
		amount: "12, 00 Rwf",
		paid: "6, 500 Rwf",
		remaining: "5, 500 Rwf",
	},

	{
		id: 7,
		name: "Minerivari",
		type: "School fee",
		amount: "12, 00 Rwf",
		paid: "6, 500 Rwf",
		remaining: "5, 500 Rwf",
	},

	{
		id: 8,
		name: "Food money",
		type: "Optional",
		amount: "12, 00 Rwf",
		paid: "6, 500 Rwf",
		remaining: "5, 500 Rwf",
	},

	{
		id: 9,
		name: "Uniform money",
		type: "Mandatory",
		amount: "12, 00 Rwf",
		paid: "6, 500 Rwf",
		remaining: "5, 500 Rwf",
	},
];

const AssignedFeesTable = () => {
	return (
		<Table
			className="data_table"
			dataSource={dumpData}
			rowKey={(record) => {
				return record?.id;
			}}
			rowClassName="shadow"
			pagination={false}
			bordered={false}
			scroll={{ x: 0 }}
		>
			<Column
				title="#"
				key="#"
				width={24}
				render={(record) => <span>{record.id + 1}</span>}
			/>

			<Column
				title="Fee name"
				key="name"
				render={(record) => <span>{record.name}</span>}
			/>

			<Column
				title="Fee type"
				key="type"
				render={(record) => (
					<span
						className={`bg-gray-200 px-2 py-[4px] rounded ${
							record.type === "School fee" && "font-medium bg-edit_bg"
						} ${record.type === "Optional" && "bg-gray-200 text-gray-400"}`}
					>
						{record.type}
					</span>
				)}
			/>

			<Column
				title="Amount"
				key="amount"
				render={(record) => (
					<span className="text-black font-semibold">{record.amount}</span>
				)}
			/>

			<Column
				title="Paid"
				key="paid"
				render={(record) => (
					<span className="text-edit_blue font-medium">{record.paid}</span>
				)}
			/>

			<Column
				title="Remaining"
				key="remaining"
				render={(record) => (
					<span className="text-red font-medium">{record.remaining}</span>
				)}
			/>

			<Column
				title="Actions"
				key="actions"
				width={100}
				render={() => <CustomButton type="edit">Pay</CustomButton>}
			/>
		</Table>
	);
};

export default AssignedFeesTable;
