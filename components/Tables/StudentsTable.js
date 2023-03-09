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
	lang,
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
				warningMessage={`${lang?.dashboard_shared?.modals?.delete_modal?.title} ${lang?.students_pg?.student}`}
				warningKey={itemToDelete?.fullName}
				itemToDelete={itemToDelete?.id}
				request={deleteStudent}
				loading={isDeleting}
				onSuccess={onDeleteStudentSuccess}
				message={lang?.alert_messages?.success?.delete_student}
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
					title={lang?.students_pg?.table?.name}
					key="name"
					render={(record) => (
						<span className="font-bold">{record?.fullName}</span>
					)}
				/>

				<Column
					title={lang?.students_pg?.table?.class}
					key="class"
					render={(record) => (
						<span>
							{record?.studentPromotions?.length &&
								record?.studentPromotions[0]?.stream?.classroom?.name}
						</span>
					)}
				/>

				<Column
					title={lang?.students_pg?.table?.stream}
					key="stream"
					render={(record) => (
						<span>
							{record?.studentPromotions.length &&
								record?.studentPromotions[0]?.stream?.name}
						</span>
					)}
				/>

				<Column
					title={lang?.students_pg?.table?.location}
					key="location"
					render={(record) => <span>{record?.address}</span>}
				/>

				<Column
					title={lang?.students_pg?.table?.actions}
					key="actions"
					width={200}
					render={(record) => (
						<div className="flex gap-4">
							<CustomButton
								type="view"
								onClick={() =>
									router.push(`${routes.students.url}/${record?.id}`)
								}
							>
								{lang?.dashboard_shared?.buttons?.view}
							</CustomButton>
							<CustomButton
								type="edit"
								onClick={() => handleEditStudent(record)}
							>
								{lang?.dashboard_shared?.buttons?.edit}
							</CustomButton>
							<CustomButton
								type="delete"
								onClick={() => handleDeleteStudents(record)}
							>
								{lang?.dashboard_shared?.buttons?.delete}
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
