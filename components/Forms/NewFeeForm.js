import React, { useEffect, useState } from "react";
import Form from "antd/lib/form";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Checkbox from "antd/lib/checkbox";
import CustomInput from "../Shared/CustomInput";
import requiredField from "../../helpers/requiredField";
import { termOptions } from "../../config/constants";
import { useSelector } from "react-redux";

const NewFeeForm = ({
	onFinish,
	form,
	isPaymentOPtional,
	setIsPaymentOPtional,
	isPaymentAdditional,
	setIsPaymentAdditional,
	classes,
	academicYears,
	itemToEdit,
	isScreenSmall,
}) => {
	const lang = useSelector((state) => state?.translation?.payload);

	useEffect(() => {
		if (itemToEdit) {
			form.setFieldsValue({
				...itemToEdit,
				classroomIDs: itemToEdit?.classroomIDs || [itemToEdit?.classroomId],
			});
		}
	}, [form, itemToEdit]);

	const handleIsPaymentAdditional = () => {
		setIsPaymentAdditional(!isPaymentAdditional);
		setIsPaymentOPtional(false);
	};

	const handleIsPaymentOptional = () => {
		setIsPaymentOPtional(!isPaymentOPtional);
	};

	return (
		<Form form={form} name="add-class" onFinish={onFinish}>
			<Row gutter={24}>
				<Col span={isScreenSmall ? 24 : 12}>
					<CustomInput
						label={lang?.fees_pg?.modals?.fee_name}
						placeholder={`${lang?.fees_pg?.modals?.fee_name}...`}
						name="name"
						rules={requiredField("Fee name")}
					/>
				</Col>

				<Col span={isScreenSmall ? 24 : 12}>
					<CustomInput
						label={lang?.fees_pg?.modals?.amount}
						placeholder={`${lang?.fees_pg?.modals?.fee_name}...`}
						name="amount"
						inputType="number"
						rules={requiredField("Amount")}
					/>
				</Col>

				<Col span={24}>
					{classes?.payload?.items?.length > 1 && (
						<CustomInput
							label={lang?.fees_pg?.modals?.classes}
							name="classroomIDs"
							type="select-multiple"
							placeholder="Please select"
							rules={requiredField("Class")}
							options={[
								...classes?.payload?.items?.map((item) => ({
									key: item?.id,
									value: item?.id,
									label: item.name,
								})),
							]}
						/>
					)}
				</Col>

				<Col span={isScreenSmall ? 24 : 12}>
					<CustomInput
						label={lang?.fees_pg?.modals?.terms}
						name="academicTerms"
						type="select-multiple"
						rules={requiredField("Term")}
						placeholder="Please select"
						style={{
							width: "100%",
						}}
						options={termOptions}
					/>
				</Col>

				<Col span={isScreenSmall ? 24 : 12}>
					{academicYears?.payload?.items?.length >= 1 && (
						<CustomInput
							type="select"
							name="academicYearId"
							label={lang?.fees_pg?.modals?.academic_year}
							rules={requiredField("Academic year")}
							options={[
								...academicYears?.payload?.items?.map((item) => ({
									key: item?.name,
									value: item?.id,
									label: item.name,
								})),
							]}
						/>
					)}
				</Col>
			</Row>

			<Row gutter={24} className="mt-6">
				<Col span={isScreenSmall ? 24 : 12}>
					<Checkbox
						name="isOptional"
						checked={isPaymentAdditional}
						onChange={() => handleIsPaymentAdditional()}
					>
						{lang?.fees_pg?.modals?.additional_payment}
					</Checkbox>
				</Col>

				{isPaymentAdditional && (
					<Col
						span={isScreenSmall ? 24 : 12}
						className={isScreenSmall && "mt-2"}
					>
						<Checkbox
							name="isOptional"
							checked={isPaymentOPtional}
							onChange={() => handleIsPaymentOptional()}
						>
							{lang?.fees_pg?.modals?.optional_payment}
						</Checkbox>
					</Col>
				)}
			</Row>
		</Form>
	);
};

export default NewFeeForm;
