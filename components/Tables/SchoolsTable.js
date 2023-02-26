import React, { useState } from "react";
import Table from "antd/lib/table";
import CustomButton from "../Shared/CustomButton";
import CustomImage from "../Shared/CustomImage";
import { useDeleteSchoolMutation } from "../../lib/api/Schools/schoolsEndpoints";
import WarningModal from "../Shared/WarningModal";

const { Column } = Table;

const SchoolsTable = ({ schools, isFetching, lang }) => {
	const [isWarningVisible, setIsWarningVisible] = useState(false);
	const [itemToDelete, setItemToDelete] = useState(null);

	const [deleteSchool, { isLoading: isDeleting }] = useDeleteSchoolMutation();

	const onDeleteSchoolSuccess = () => {
		setIsWarningVisible(false);
		setItemToDelete(null);
	};

	const handleDeleteSchool = (item) => {
		setItemToDelete(item);
		setIsWarningVisible(true);
	};

	return (
		<>
			<WarningModal
				isVisible={isWarningVisible}
				setIsVisible={setIsWarningVisible}
				warningMessage={`${lang?.dashboard_shared?.modals?.delete_modal?.title} ${lang?.schools_pg?.school}`}
				warningKey={itemToDelete?.schoolName}
				itemToDelete={itemToDelete?.id}
				request={deleteSchool}
				loading={isDeleting}
				onSuccess={onDeleteSchoolSuccess}
			/>

			<Table
				className="data_table"
				dataSource={schools}
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
					render={(record) => (
						<CustomImage
							src={record?.schoolLogo}
							width={38}
							height={38}
							className="object-cover rounded-full"
						/>
					)}
				/>

				<Column
					title={lang?.schools_pg?.table?.name}
					key="name"
					render={(record) => (
						<span className="font-bold">{record?.schoolName}</span>
					)}
				/>

				<Column
					title={lang?.schools_pg?.table?.title}
					key="title"
					render={(record) => <span>{record?.schoolTitle}</span>}
				/>

				<Column
					title={lang?.schools_pg?.table?.type}
					key="type"
					render={(record) => <span>{record?.schoolType}</span>}
				/>

				<Column
					title={lang?.schools_pg?.table?.country}
					key="country"
					render={(record) => <span>{record?.countryName}</span>}
				/>

				<Column
					title={lang?.schools_pg?.table?.actions}
					key="actions"
					width={100}
					render={(record) => (
						<div className="flex gap-12">
							<CustomButton
								type="delete"
								onClick={() => handleDeleteSchool(record)}
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

export default SchoolsTable;
