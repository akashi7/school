import React, { useState } from "react";
import Table from "antd/lib/table";
import CustomButton from "../Shared/CustomButton";
import WarningModal from "../Shared/WarningModal";
import { useDeleteFeeMutation } from "../../lib/api/Fees/FeesEndpoints";

const { Column } = Table;

const FeesTable = ({ fees, isFetching, setItemToEdit, setIsVisible }) => {
	const [isWarningVisible, setIsWarningVisible] = useState(false);
	const [itemToDelete, setItemToDelete] = useState(null);

	const [deleteFee, { isLoading: isDeleting }] = useDeleteFeeMutation();

	const onDeleteFeeSuccess = () => {
		setIsWarningVisible(false);
		setItemToDelete(null);
	};

	const handleDeleteFee = (item) => {
		setItemToDelete(item);
		setIsWarningVisible(true);
	};

	const handleEditFee = (item) => {
		setIsVisible(true);
		setItemToEdit(item);
	};

	return (
		<>
			<WarningModal
				isVisible={isWarningVisible}
				setIsVisible={setIsWarningVisible}
				warningMessage="Do you really want to delete fee"
				warningKey={itemToDelete?.name}
				itemToDelete={itemToDelete?.id}
				request={deleteFee}
				loading={isDeleting}
				onSuccess={onDeleteFeeSuccess}
			/>

			<Table
				className="data_table"
				dataSource={fees?.payload?.items}
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
					render={(record) => <span className="font-bold">{record?.name}</span>}
				/>

				<Column
					title="Classes"
					key="classes"
					render={(record) => <span>{record?.classroom?.name}</span>}
				/>

				<Column
					title="Terms"
					key="terms"
					render={(record) => (
						<span>{record?.academicTerms?.map((term) => `${term}, `)}</span>
					)}
				/>

				<Column
					title="Year"
					key="year"
					render={(record) => <span>{record?.academicYear?.name}</span>}
				/>

				<Column
					title="Fee type"
					key="type"
					render={(record) => (
						<span
							className={`bg-gray-200 px-2 py-[4px] rounded ${
								record?.type === "SCHOOL_FEE" && "font-medium bg-edit_bg"
							} ${record?.optional && "bg-gray-200 text-gray-400"}`}
						>
							{record?.type?.replaceAll("_", " ")}
						</span>
					)}
				/>

				<Column
					title="Amount"
					key="amount"
					render={(record) => (
						<span className="text-black font-semibold">
							{record?.amount} Rwf
						</span>
					)}
				/>

				<Column
					title="Actions"
					key="actions"
					width={200}
					render={(record) => (
						<div className="flex gap-12">
							<CustomButton type="edit" onClick={() => handleEditFee(record)}>
								Edit
							</CustomButton>

							<CustomButton
								type="delete"
								onClick={() => handleDeleteFee(record)}
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

export default FeesTable;
