import React, { useState } from "react";
import Table from "antd/lib/table";
import CustomButton from "../Shared/CustomButton";
import WarningModal from "../Shared/WarningModal";
import moment from "moment";
import { useDeleteAcademicYearMutation } from "../../lib/api/AcademicYear/academicYearEndpoints";
import CustomImage from "../Shared/CustomImage";

const { Column } = Table;

const AcademicYearsTable = ({
	academicYears,
	isFetching,
	setItemToEdit,
	setIsEditModalVisible,
	lang,
}) => {
	const [isWarningVisible, setIsWarningVisible] = useState(false);
	const [itemToDelete, setItemToDelete] = useState(null);

	const [deleteAcademicYear, { isLoading: isDeleting }] =
		useDeleteAcademicYearMutation();

	const onDeleteAcademicYearSuccess = () => {
		setIsWarningVisible(false);
		setItemToDelete(null);
	};

	const handleDeleteAcademicYear = (item) => {
		setItemToDelete(item);
		setIsWarningVisible(true);
	};

	const handleEditAcademicYear = (item) => {
		setItemToEdit(item);
		setIsEditModalVisible(true);
	};

	return (
		<>
			<WarningModal
				isVisible={isWarningVisible}
				setIsVisible={setIsWarningVisible}
				warningMessage={`${lang?.dashboard_shared?.modals?.delete_modal?.title} ${lang?.academic_years_pg?.academic_year}`}
				warningKey={itemToDelete?.name}
				itemToDelete={itemToDelete?.id}
				request={deleteAcademicYear}
				loading={isDeleting}
				onSuccess={onDeleteAcademicYearSuccess}
			/>

			<Table
				className="data_table"
				dataSource={academicYears}
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
					title={lang?.academic_years_pg?.table?.academic_year}
					key="name"
					render={(record) => <span className="font-bold">{record?.name}</span>}
				/>

				<Column
					title={lang?.academic_years_pg?.table?.since}
					key="createdAt"
					render={(record) => (
						<span>{moment(record?.createdAt).fromNow()}</span>
					)}
				/>

				<Column
					title={lang?.academic_years_pg?.table?.is_current}
					key="current"
					render={(record) => (
						<CustomImage
							src={`/icons/${record.current ? "checked" : "red-close"}.svg`}
							width={24}
						/>
					)}
				/>

				<Column
					title={lang?.academic_years_pg?.table?.actions}
					key="actions"
					width={200}
					render={(record) => (
						<div className="flex gap-12">
							<CustomButton
								type="edit"
								onClick={() => handleEditAcademicYear(record)}
							>
								{lang?.dashboard_shared?.buttons?.edit}
							</CustomButton>

							<CustomButton
								type="delete"
								onClick={() => handleDeleteAcademicYear(record)}
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

export default AcademicYearsTable;
