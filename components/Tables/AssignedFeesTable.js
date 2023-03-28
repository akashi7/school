import React, { useState } from "react";
import Table from "antd/lib/table";
import Form from "antd/lib/form";
import CustomButton from "../Shared/CustomButton";
import { toLocalString } from "../../helpers/numbers";
import AssignedFeesTableMobile from "./Mobile/AssignedFeesTableMobile";
import CustomModal from "../Shared/CustomModal";
import ManualPaymentForm from "../Forms/ManualPaymentForm";
import { useManualPayMutation } from "../../lib/api/Students/studentsEndpoints";
import handleAPIRequests from "../../helpers/handleAPIRequests";

const { Column } = Table;

const AssignedFeesTable = ({
	data,
	isFetching,
	lang,
	isScreenSmall,
	studentId,
}) => {
	const [isPayModalVisible, setIsPayModalVisible] = useState(false);
	const [activeFee, setActiveFee] = useState(null);

	const [form] = Form.useForm();

	const [manualPay, { isLoading }] = useManualPayMutation();

	const handleCancel = () => {
		setActiveFee(null);
		setIsPayModalVisible(false);
	};

	const handleManualPayment = (fee) => {
		setActiveFee(fee);
		setIsPayModalVisible(true);
	};

	const onManualPaymentFinish = (values) => {
		const data = { ...values, amount: +values?.amount };

		handleAPIRequests({
			request: manualPay,
			paymentMethod: "OTHER",
			notify: true,
			onSuccess: handleCancel,
			studentId,
			feeId: activeFee?.id,
			...data,
		});
	};

	return (
		<>
			<CustomModal
				isVisible={isPayModalVisible}
				setIsVisible={setIsPayModalVisible}
				loading={isLoading}
				width={700}
				handleCancel={handleCancel}
				title={lang?.students_pg?.modals?.pay_manual}
				footerContent={
					<CustomButton
						loading={isLoading}
						type="primary"
						htmlType="submit"
						form="manual-payment"
					>
						{lang?.dashboard_shared?.buttons?.save}
					</CustomButton>
				}
			>
				<ManualPaymentForm
					form={form}
					onFinish={onManualPaymentFinish}
					lang={lang}
				/>
			</CustomModal>

			{isScreenSmall ? (
				<AssignedFeesTableMobile
					dataSource={data?.payload}
					lang={lang}
					loading={isFetching}
				/>
			) : (
				<Table
					className="data_table"
					dataSource={data?.payload}
					rowKey={(record) => {
						return record?.id;
					}}
					rowClassName="shadow"
					pagination={false}
					bordered={false}
					loading={isFetching}
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
						title={lang?.students_pg?.profile?.table?.fee_name}
						key="name"
						render={(record) => (
							<span className="font-bold">{record.name}</span>
						)}
					/>

					<Column
						title={lang?.students_pg?.profile?.table?.fee_type}
						key="type"
						render={(record) => (
							<span
								className={`bg-gray-200 px-2 py-[4px] rounded ${
									record.type === "School fee" && "font-medium bg-edit_bg"
								} ${record.type === "Optional" && "bg-gray-200 text-gray-400"}`}
							>
								{record?.type?.replace("_", " ")}
							</span>
						)}
					/>

					<Column
						title={lang?.students_pg?.profile?.table?.amount}
						key="amount"
						render={(record) => (
							<span className="text-black font-semibold">
								{toLocalString(record.amount)} Rwf
							</span>
						)}
					/>

					<Column
						title={lang?.students_pg?.profile?.table?.paid}
						key="paid"
						render={(record) => (
							<span className="text-edit_blue font-medium">
								{toLocalString(record.paid)} Rwf
							</span>
						)}
					/>

					<Column
						title={lang?.students_pg?.profile?.table?.remaining}
						key="remaining"
						render={(record) => (
							<span className="text-red font-medium">
								{toLocalString(record.remaining)} Rwf
							</span>
						)}
					/>

					<Column
						title={lang?.students_pg?.profile?.table?.actions}
						key="actions"
						width={100}
						render={(record) => (
							<CustomButton
								type="edit"
								onClick={() => handleManualPayment(record)}
							>
								{lang?.dashboard_shared?.buttons?.pay}
							</CustomButton>
						)}
					/>
				</Table>
			)}
		</>
	);
};

export default AssignedFeesTable;
