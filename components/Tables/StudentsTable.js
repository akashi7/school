import React from "react";
import Table from "antd/lib/table";
import CustomButton from "../Shared/CustomButton";
import { useRouter } from "next/router";
import routes from "../../config/routes";

const { Column } = Table;

const StudentsTable = ({ students }) => {
	const router = useRouter();

	return (
		<Table
			className="data_table"
			dataSource={students}
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
				render={(text, record, index) => <span>{index + 1}</span>}
			/>

			<Column
				title="Name"
				key="name"
				render={(record) => <span>{record?.student?.fullName}</span>}
			/>

			<Column
				title="Class"
				key="class"
				render={(record) => <span>{record?.stream?.classroom?.name}</span>}
			/>

			<Column
				title="Stream"
				key="stream"
				render={(record) => <span>{record?.stream?.name}</span>}
			/>

			<Column
				title="Location"
				key="location"
				render={(record) => <span>{record?.student?.address}</span>}
			/>

			<Column
				title="Actions"
				key="actions"
				width={200}
				render={(record) => (
					<div className="flex gap-12">
						<CustomButton
							type="view"
							onClick={() =>
								router.push(`${routes.students.url}/${record?.student.id}`)
							}
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
