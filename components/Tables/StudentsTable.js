import React, { useState } from "react";
import { useRouter } from "next/router";
import Table from "antd/lib/table";
import PropTypes from "prop-types";
import CustomButton from "../Shared/CustomButton";
import WarningModal from "../Shared/WarningModal";
import routes from "../../config/routes";
import { useDeleteStudentMutation } from "../../lib/api/Students/studentsEndpoints";

const { Column } = Table;

const StudentsTable = ({
	students,
	isFetching,
	setItemToEdit,
	setIsEditModalVisible,
}) => {
	const [isWarningVisible, setIsWarningVisible] = useState(false);
	const [itemToDelete, setItemToDelete] = useState(null);

	const [deleteStudent, { isLoading: isDeleting }] = useDeleteStudentMutation();

	const onDeleteStudentSuccess = () => {
		setIsWarningVisible(false);
		setItemToDelete(null);
	};

	const handleDeleteStudents = (item) => {
		setItemToDelete(item);
		setIsWarningVisible(true);
	};

	const handleEditStudent = (item) => {
		setItemToEdit(item);
		setIsEditModalVisible(true);
	};

	const router = useRouter();

	return (
		<>
			<WarningModal
				isVisible={isWarningVisible}
				setIsVisible={setIsWarningVisible}
				warningMessage="Do you really want to delete class"
				warningKey={itemToDelete?.student?.fullName}
				itemToDelete={itemToDelete?.student?.id}
				request={deleteStudent}
				loading={isDeleting}
				onSuccess={onDeleteStudentSuccess}
			/>

			<Table
				className="data_table"
				dataSource={students}
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
					title="Name"
					key="name"
					render={(record) => (
						<span className="font-bold">{record?.student?.fullName}</span>
					)}
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
							<CustomButton
								type="edit"
								onClick={() => handleEditStudent(record)}
							>
								Edit
							</CustomButton>
							<CustomButton
								type="delete"
								onClick={() => handleDeleteStudents(record)}
							>
								Delete
							</CustomButton>
						</div>
					)}
				/>
			</Table>
		</>
	);
};

StudentsTable.propTypes = {
	students: PropTypes.array,
	isFetching: PropTypes.bool,
	setItemToEdit: PropTypes.func,
	setIsEditModalVisible: PropTypes.func,
};

export default StudentsTable;
