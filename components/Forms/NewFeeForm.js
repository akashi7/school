import React, { useEffect, useState } from "react";
import Form from "antd/lib/form";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Checkbox from "antd/lib/checkbox";
import CustomInput from "../Shared/CustomInput";
import requiredField from "../../helpers/requiredField";
import { termOptions } from "../../config/constants";

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
}) => {
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
				<Col span={12}>
					<CustomInput
						label="Fee name"
						placeholder="Fee name..."
						name="name"
						rules={requiredField("Fee name")}
					/>
				</Col>

				<Col span={12}>
					<CustomInput
						label="Amount"
						placeholder="Amount..."
						name="amount"
						inputType="number"
						rules={requiredField("Amount")}
					/>
				</Col>

				<Col span={24}>
					{classes?.payload?.items?.length > 1 && (
						<CustomInput
							label="Classes"
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

				<Col span={12}>
					<CustomInput
						label="Terms"
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

				<Col span={12}>
					{academicYears?.payload?.items?.length >= 1 && (
						<CustomInput
							type="select"
							name="academicYearId"
							label="Academic year"
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
				<Col span={12}>
					<Checkbox
						name="isOptional"
						checked={isPaymentAdditional}
						onChange={() => handleIsPaymentAdditional()}
					>
						Additional payment
					</Checkbox>
				</Col>

				{isPaymentAdditional && (
					<Col span={12}>
						<Checkbox
							name="isOptional"
							checked={isPaymentOPtional}
							onChange={() => handleIsPaymentOptional()}
						>
							Optional payment
						</Checkbox>
					</Col>
				)}
			</Row>
		</Form>
	);
};

export default NewFeeForm;
