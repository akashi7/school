import React, { useState } from "react";
import Table from "antd/lib/table";
import Dropdown from "antd/lib/dropdown";
import { useDeleteClassMutation } from "../../lib/api/Classrooms/classroomsEndpoints";
import CustomButton from "../Shared/CustomButton";
import WarningModal from "../Shared/WarningModal";
import CustomImage from "../Shared/CustomImage";

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
	showMoreIcons,
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
				className="data_table w-[100%]"
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
					width={showMoreIcons ? 40 : 200}
					render={(record) =>
						showMoreIcons ? (
							<div className="flex gap-4 justify-end">
								<Dropdown
									overlay={
										<div className="flex flex-col bg-white p-6 shadow border border-gray-100 gap-4">
											<CustomButton
												type="view"
												onClick={() => setVisibleClass(record)}
												disabled={record?.id === visibleClass?.id}
											>
												{lang?.dashboard_shared?.buttons?.view}
											</CustomButton>

											<CustomButton
												type="edit"
												onClick={() => handleEditClass(record)}
											>
												{lang?.dashboard_shared?.buttons?.edit}
											</CustomButton>

											<CustomButton
												type="delete"
												onClick={() => handleDeleteClass(record)}
											>
												{lang?.dashboard_shared?.buttons?.delete}
											</CustomButton>
										</div>
									}
									trigger={["click"]}
									placement="bottomLeft"
								>
									<CustomImage
										className="cursor-pointer"
										src="/icons/table_see_more.svg"
										width={16}
										height={16}
									/>
								</Dropdown>
							</div>
						) : (
							<div className="flex gap-4">
								<CustomButton
									type="view"
									onClick={() => setVisibleClass(record)}
									disabled={record?.id === visibleClass?.id}
								>
									{lang?.dashboard_shared?.buttons?.view}
								</CustomButton>

								<CustomButton
									type="edit"
									onClick={() => handleEditClass(record)}
								>
									{lang?.dashboard_shared?.buttons?.edit}
								</CustomButton>

								<CustomButton
									type="delete"
									onClick={() => handleDeleteClass(record)}
								>
									{lang?.dashboard_shared?.buttons?.delete}
								</CustomButton>
							</div>
						)
					}
				/>
			</Table>
		</>
	);
};

export default ClassesTable;
