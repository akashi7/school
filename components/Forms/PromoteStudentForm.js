import React, { useEffect } from "react";
import Form from "antd/lib/form";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import From from "antd/lib/form";
import PropTypes from "prop-types";
import CustomInput from "../Shared/CustomInput";
import requiredField from "../../helpers/requiredField";
import { termOptions } from "../../config/constants";

const PromoteStudentForm = ({
	onFinish,
	academicYears,
	classes,
	streams,
	setClassroomId,
	isClassLoading,
	isStreamLoading,
	isAcademicYearsLoading,
	data,
}) => {
	const [form] = Form.useForm();

	const handleClassroomChange = (value) => {
		setClassroomId(value);
		form.setFieldsValue({ streamId: "" });
	};

	useEffect(() => {
		form.setFieldsValue({
			placeHolderAcademicTerm: data?.payload?.academicTerm,
		});
	}, [data, form]);

	const classList = classes?.payload?.items?.length
		? [
				...classes?.payload?.items?.map((item) => ({
					key: item?.id,
					value: item?.id,
					label: item.name,
				})),
		  ]
		: [];

	const streamsList = streams?.payload?.items?.length
		? [
				...streams?.payload?.items?.map((item) => ({
					key: item?.id,
					value: item?.id,
					label: item.name,
				})),
		  ]
		: [];

	const academicYearsList = academicYears?.payload?.totalItems
		? [
				...academicYears?.payload?.items?.map((item) => ({
					key: item?.name,
					value: item?.id,
					label: item.name,
				})),
		  ]
		: [];

	return (
		<Form form={form} name="promote-student" onFinish={onFinish}>
			<p className="text-gray-300 my-4 mt-0">Current academic info:</p>

			<Row align="middle" wrap={false} gutter={24}>
				<Col className="w-[50%]">
					<CustomInput
						type="select"
						name="placeHolderAcademicYearId"
						label="Academic year"
						disabled
						isLoading={isAcademicYearsLoading}
						options={academicYearsList}
					/>
				</Col>

				<Col className="w-[50%]">
					<CustomInput
						label="Term"
						type="select"
						name="placeHolderAcademicTerm"
						disabled
						options={[...termOptions]}
						placeholder="Select term"
					/>
				</Col>
			</Row>

			<Row align="middle" wrap={false} gutter={24}>
				<Col className="w-[50%]">
					<CustomInput
						label="Classes"
						name="placeHolderClassroomId"
						disabled
						type="select"
						placeholder="Please select"
						onChange={handleClassroomChange}
						isLoading={isClassLoading}
						options={classList}
					/>
				</Col>

				<Col className="w-[50%]">
					<CustomInput
						type="select"
						label="Stream"
						name="placeHolderStreamId"
						isLoading={isStreamLoading}
						disabled
						options={streamsList}
					/>
				</Col>
			</Row>

			<p className="text-gray-300 my-4">Promote student to:</p>

			<Row align="middle" wrap={false} gutter={24}>
				<Col className="w-[50%]">
					<CustomInput
						type="select"
						name="academicYearId"
						label="Academic year"
						isLoading={isAcademicYearsLoading}
						rules={requiredField("Academic year")}
						options={academicYearsList}
					/>
				</Col>

				<Col className="w-[50%]">
					<CustomInput
						label="Term"
						type="select"
						name="academicTerm"
						options={termOptions}
						placeholder="Select term"
						rules={requiredField("Term")}
					/>
				</Col>
			</Row>

			<Row align="middle" wrap={false} gutter={24}>
				<Col className="w-[50%]">
					<CustomInput
						label="Classes"
						name="classroomId"
						type="select"
						placeholder="Please select"
						onChange={handleClassroomChange}
						isLoading={isClassLoading}
						rules={requiredField("Class")}
						options={classList}
					/>
				</Col>

				<Col className="w-[50%]">
					<CustomInput
						type="select"
						label="Stream"
						name="streamId"
						isLoading={isStreamLoading}
						disabled={isStreamLoading}
						options={streamsList}
						rules={requiredField("Stream")}
					/>
				</Col>
			</Row>
		</Form>
	);
};

PromoteStudentForm.propTypes = {
	onFinish: PropTypes.func,
	form: PropTypes.object,
};

export default PromoteStudentForm;
