import React, { useState } from "react";
import Table from "antd/lib/table";
import { useDeleteClassMutation } from "../../lib/api/Classrooms/classroomsEndpoints";
import CustomButton from "../Shared/CustomButton";
import WarningModal from "../Shared/WarningModal";

const { Column } = Table;

const ClassesTable = ({
	classes,
	visibleClass,
	setVisibleClass,
	setItemToEdit,
	setSearch,
	setCurrentPage,
	setIsVisible,
	isFetching,
	lang,
}) => {
	const [isWarningVisible, setIsWarningVisible] = useState(false);
	const [itemToDelete, setItemToDelete] = useState(null);

	const [deleteClass, { isLoading: isDeleting }] = useDeleteClassMutation();

	const onDeleteClassSuccess = () => {
		setIsWarningVisible(false);
		setSearch("");
		setCurrentPage(0);
		setVisibleClass(null);
		setItemToDelete(null);
	};

	const handleDeleteClass = (item) => {
		setItemToDelete(item);
		setIsWarningVisible(true);
	};

	const handleEditClass = (item) => {
		setIsVisible(true);
		setItemToEdit(item);
	};

	return (
		<>
			<WarningModal
				isVisible={isWarningVisible}
				setIsVisible={setIsWarningVisible}
				warningMessage={`${lang?.dashboard_shared?.modals?.delete_modal?.title} ${lang?.classrooms_pg?.classroom}`}
				warningKey={itemToDelete?.name}
				itemToDelete={itemToDelete?.id}
				request={deleteClass}
				loading={isDeleting}
				onSuccess={onDeleteClassSuccess}
				message={lang?.alert_messages?.success?.delete_classroom}
			/>

			<Table
				className="data_table"
				dataSource={classes}
				rowKey={(record) => {
					return record?.id;
				}}
				rowClassName="shadow"
				pagination={false}
				bordered={false}
				loading={isFetching}
				showHeader={false}
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
					render={(record) => <span className="font-bold">{record?.name}</span>}
				/>

				<Column
					title="Actions"
					key="actions"
					width={200}
					render={(record) => (
						<div className="flex gap-12">
							<CustomButton
								type="view"
								onClick={() => setVisibleClass(record)}
								disabled={record?.id === visibleClass?.id}
							>
								{lang?.dashboard_shared?.buttons?.view}
							</CustomButton>

							<CustomButton type="edit" onClick={() => handleEditClass(record)}>
								{lang?.dashboard_shared?.buttons?.edit}
							</CustomButton>

							<CustomButton
								type="delete"
								onClick={() => handleDeleteClass(record)}
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

export default ClassesTable;
