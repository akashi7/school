import React, { useState } from "react";
import Table from "antd/lib/table";
import moment from "moment";
import Switch from "antd/lib/switch";
import {
	CheckOutlined,
	CloseOutlined,
	LoadingOutlined,
} from "@ant-design/icons";
import CustomButton from "../Shared/CustomButton";
import WarningModal from "../Shared/WarningModal";
import {
	useDeleteAcademicYearMutation,
	useSetCurrentYearMutation,
} from "../../lib/api/AcademicYear/academicYearEndpoints";
import CustomImage from "../Shared/CustomImage";
import handleAPIRequests from "../../helpers/handleAPIRequests";

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
	const [itemToToggle, setItemToToggle] = useState(null);

	const [deleteAcademicYear, { isLoading: isDeleting }] =
		useDeleteAcademicYearMutation();
	const [setCurrentYear, { isLoading: isSettingCurrentYear }] =
		useSetCurrentYearMutation();

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

	const handleSetCurrentYear = (item) => {
		setItemToToggle(item?.id);

		handleAPIRequests({
			request: setCurrentYear,
			id: item.id,
			notify: true,
		});
	};

	const isToggling = (record) =>
		isSettingCurrentYear && itemToToggle === record?.id;

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
					render={(record) =>
						!isToggling(record) && !isFetching ? (
							<Switch
								checkedChildren={<CheckOutlined />}
								unCheckedChildren={<CloseOutlined />}
								defaultChecked={record?.current}
								onClick={() => handleSetCurrentYear(record)}
							/>
						) : (
							<LoadingOutlined style={{ fontSize: 16 }} spin />
						)
					}
				/>

				<Column
					title={lang?.academic_years_pg?.table?.actions}
					key="actions"
					width={200}
					render={(record) => (
						<div className="flex gap-4">
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
