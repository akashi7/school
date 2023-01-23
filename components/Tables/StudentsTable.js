import React from "react";
import Table from "antd/lib/table";
import CustomButton from "../Shared/CustomButton";
import { useRouter } from "next/router";
import routes from "../../config/routes";

const { Column } = Table;

const dumpData = [
	{
		id: 0,
		name: "Issa Jean Marie",
		class: "P3",
		stream: "F",
		location: "Kibagabaga",
	},

	{
		id: 1,
		name: "Kabayiza Yannick",
		class: "S4",
		stream: "C",
		location: "Munzenze",
	},

	{
		id: 2,
		name: "Rwigema ERic",
		class: "P1",
		stream: "A",
		location: "Nyarugenge, Downtown",
	},

	{
		id: 3,
		name: "Yves Bisemage",
		class: "P3",
		stream: "F",
		location: "Nyabugogo",
	},
	{
		id: 4,
		name: "Issa Jean Marie",
		class: "P3",
		stream: "F",
		location: "Kibagabaga",
	},

	{
		id: 5,
		name: "Kabayiza Yannick",
		class: "S4",
		stream: "C",
		location: "Munzenze",
	},

	{
		id: 6,
		name: "Rwigema ERic",
		class: "P1",
		stream: "A",
		location: "Nyarugenge, Downtown",
	},

	{
		id: 7,
		name: "Yves Bisemage",
		class: "P3",
		stream: "F",
		location: "Nyabugogo",
	},
	{
		id: 8,
		name: "Issa Jean Marie",
		class: "P3",
		stream: "F",
		location: "Kibagabaga",
	},

	{
		id: 9,
		name: "Kabayiza Yannick",
		class: "S4",
		stream: "C",
		location: "Munzenze",
	},

	{
		id: 10,
		name: "Rwigema ERic",
		class: "P1",
		stream: "A",
		location: "Nyarugenge, Downtown",
	},

	{
		id: 11,
		name: "Yves Bisemage",
		class: "P3",
		stream: "F",
		location: "Nyabugogo",
	},
	{
		id: 12,
		name: "Issa Jean Marie",
		class: "P3",
		stream: "F",
		location: "Kibagabaga",
	},

	{
		id: 13,
		name: "Kabayiza Yannick",
		class: "S4",
		stream: "C",
		location: "Munzenze",
	},

	{
		id: 14,
		name: "Rwigema ERic",
		class: "P1",
		stream: "A",
		location: "Nyarugenge, Downtown",
	},

	{
		id: 15,
		name: "Yves Bisemage",
		class: "P3",
		stream: "F",
		location: "Nyabugogo",
	},
	{
		id: 16,
		name: "Issa Jean Marie",
		class: "P3",
		stream: "F",
		location: "Kibagabaga",
	},

	{
		id: 17,
		name: "Kabayiza Yannick",
		class: "S4",
		stream: "C",
		location: "Munzenze",
	},

	{
		id: 18,
		name: "Rwigema ERic",
		class: "P1",
		stream: "A",
		location: "Nyarugenge, Downtown",
	},

	{
		id: 19,
		name: "Yves Bisemage",
		class: "P3",
		stream: "F",
		location: "Nyabugogo",
	},
	{
		id: 20,
		name: "Issa Jean Marie",
		class: "P3",
		stream: "F",
		location: "Kibagabaga",
	},

	{
		id: 21,
		name: "Kabayiza Yannick",
		class: "S4",
		stream: "C",
		location: "Munzenze",
	},

	{
		id: 22,
		name: "Rwigema ERic",
		class: "P1",
		stream: "A",
		location: "Nyarugenge, Downtown",
	},

	{
		id: 23,
		name: "Yves Bisemage",
		class: "P3",
		stream: "F",
		location: "Nyabugogo",
	},
];

const StudentsTable = () => {
	const router = useRouter();

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
				title="Class"
				key="class"
				render={(record) => <span>{record.class}</span>}
			/>

			<Column
				title="Stream"
				key="stream"
				render={(record) => <span>{record.stream}</span>}
			/>

			<Column
				title="Location"
				key="location"
				render={(record) => <span>{record.location}</span>}
			/>

			<Column
				title="Actions"
				key="actions"
				width={200}
				render={(record) => (
					<div className="flex gap-12">
						<CustomButton
							type="view"
							onClick={() => router.push(`${routes.students.url}/${record.id}`)}
						>
							View
						</CustomButton>
						<CustomButton type="edit">Edit</CustomButton>
						<CustomButton type="delete">Delete</CustomButton>
					</div>
				)}
			/>
		</Table>
	);
};

export default StudentsTable;
