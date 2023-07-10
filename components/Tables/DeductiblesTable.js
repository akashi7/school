import Table from "antd/lib/table";
import React, { useState } from "react";
import { useDeleteFeeMutation } from "../../lib/api/Fees/FeesEndpoints";
import CustomButton from "../Shared/CustomButton";

const { Column } = Table;

const DeductiblesTable = ({
	deductibles,
	isFetching,
	setItemToEdit,
	setIsVisible,
	lang,
	isScreenSmall,
}) => {
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
			{/* <WarningModal
				isVisible={isWarningVisible}
				setIsVisible={setIsWarningVisible}
				warningMessage={`${lang?.dashboard_shared?.modals?.delete_modal?.title} ${lang?.fees_pg?.fee}`}
				warningKey={itemToDelete?.name}
				itemToDelete={itemToDelete?.id}
				request={deleteFee}
				loading={isDeleting}
				onSuccess={onDeleteFeeSuccess}
			/> */}

			{isScreenSmall ? (
				<div>Coming soon</div>
			) : (
				<Table
					className="data_table"
					dataSource={deductibles}
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
						title={lang?.fees_pg?.table?.name}
						key="name"
						render={(record) => (
							<span className="font-bold">{record?.name}</span>
						)}
					/>

					<Column
						title={"type"}
						key="type"
						render={(record) => (
							<span>
								{record?.type}
							</span>
						)}
					/>

					<Column
						title={"amount"}
						key="amount"
						render={(record) => (
							<span>{record?.amount}</span>
						)}
					/>

					<Column
						title={"enumaration"}
						key="enumaration"
						render={(record) => <span>{record?.enumaration}</span>}
					/>


					<Column
						title={lang?.fees_pg?.table?.actions}
						key="actions"
						width={200}
						render={(record) => (
							<div className="flex gap-4">
								<CustomButton type="edit" >
									{lang?.dashboard_shared?.buttons?.edit}
								</CustomButton>

								<CustomButton
									type="delete"
									
								>
									{lang?.dashboard_shared?.buttons?.delete}
								</CustomButton>
							</div>
						)}
					/>
				</Table>
			)}
		</>
	);
};

export default DeductiblesTable;
