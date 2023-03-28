import React, { useEffect } from "react";
import Form from "antd/lib/form";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import PropTypes from "prop-types";
import CustomInput from "../Shared/CustomInput";
import requiredField from "../../helpers/requiredField";
import { useSelector } from "react-redux";

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
	isScreenSmall,
}) => {
	const [form] = Form.useForm();

	const lang = useSelector((state) => state?.translation?.payload);

	const handleClassroomChange = (value) => {
		setClassroomId(value);
		form.setFieldsValue({ streamId: "" });
	};

	useEffect(() => {
		form.setFieldsValue({
			placeHolderAcademicTerm: data?.payload?.academicTerm,
			placeHolderAcademicYearId: data?.payload?.academicYear?.id,
			placeHolderClassroomId: data?.payload?.stream?.classroom?.id,
			placeHolderStreamId: data?.payload?.stream?.id,
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
			<p className="text-gray-300 my-4 mt-0">
				{lang?.students_pg?.profile?.modals?.current_academic_info}
			</p>

			<Row align="middle" wrap={false} gutter={24} className="opacity-60">
				<Col className="w-[100%]">
					<CustomInput
						type="select"
						name="placeHolderAcademicYearId"
						label={lang?.students_pg?.modals?.academic_year}
						disabled
						isLoading={isAcademicYearsLoading}
						options={academicYearsList}
					/>
				</Col>
			</Row>

			<Row align="middle" wrap={false} gutter={24} className="opacity-60">
				<Col className="w-[50%]">
					<CustomInput
						label={lang?.students_pg?.modals?.class}
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
						label={lang?.students_pg?.modals?.stream}
						name="placeHolderStreamId"
						isLoading={isStreamLoading}
						disabled
						options={streamsList}
					/>
				</Col>
			</Row>

			<p className="text-gray-300 my-4">
				{lang?.students_pg?.profile?.modals?.promote_student_to}
			</p>

			<Row align="middle" wrap={false} gutter={24}>
				<Col className="w-[100%]">
					<CustomInput
						type="select"
						name="academicYearId"
						label={lang?.students_pg?.modals?.academic_year}
						isLoading={isAcademicYearsLoading}
						rules={requiredField("Academic year")}
						options={academicYearsList}
					/>
				</Col>
			</Row>

			<Row align="middle" wrap={isScreenSmall} gutter={24}>
				<Col className={isScreenSmall ? "w-full" : "w-[50%]"}>
					<CustomInput
						label={lang?.students_pg?.modals?.class}
						name="classroomId"
						type="select"
						placeholder="Please select"
						onChange={handleClassroomChange}
						isLoading={isClassLoading}
						rules={requiredField("Class")}
						options={classList}
					/>
				</Col>

				<Col className={isScreenSmall ? "w-full" : "w-[50%]"}>
					<CustomInput
						type="select"
						label={lang?.students_pg?.modals?.stream}
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
