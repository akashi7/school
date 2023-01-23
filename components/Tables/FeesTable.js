import React from "react";
import Table from "antd/lib/table";
import CustomButton from "../Shared/CustomButton";

const { Column } = Table;

const dumpData = [
	{
		id: 0,
		name: "Fee name",
		type: "Mandatory",
		amount: "12, 00 Rwf",
		classes: "P1, P3, P5",
		terms: "I, I, II",
		year: "2022",
	},

	{
		id: 1,
		name: "Fee name",
		type: "Mandatory",
		amount: "12, 00 Rwf",
		classes: "P1, P3, P5",
		terms: "I, I, II",
		year: "2022",
	},

	{
		id: 2,
		name: "0 money",
		type: "Optional",
		amount: "12, 00 Rwf",
		classes: "P1, P3, P5",
		terms: "I, I, II",
		year: "2022",
	},

	{
		id: 3,
		name: "0 money",
		type: "Mandatory",
		amount: "12, 00 Rwf",
		classes: "P1, P3, P5",
		terms: "I, I, II",
		year: "2022",
	},

	{
		id: 4,
		name: "0 money",
		type: "School fee",
		amount: "12, 00 Rwf",
		classes: "P1, P3, P5",
		terms: "I, I, II",
		year: "2022",
	},
];

const FeesTable = () => {
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
				title="Name"
				key="name"
				render={(record) => <span>{record.name}</span>}
			/>

			<Column
				title="Classes"
				key="classes"
				render={(record) => <span>{record.classes}</span>}
			/>

			<Column
				title="Terms"
				key="terms"
				render={(record) => <span>{record.terms}</span>}
			/>

			<Column
				title="Year"
				key="year"
				render={(record) => <span>{record.year}</span>}
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
				title="Actions"
				key="actions"
				width={200}
				render={() => (
					<div className="flex gap-12">
						<CustomButton type="edit">Edit</CustomButton>
						<CustomButton type="delete">Delete</CustomButton>
					</div>
				)}
			/>
		</Table>
	);
};

export default FeesTable;
