import React, { useEffect } from "react";
import Form from "antd/lib/form";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import PropTypes from "prop-types";
import { LoadingOutlined } from "@ant-design/icons";
import CustomInput from "../Shared/CustomInput";
import requiredField from "../../helpers/requiredField";
import { termOptions } from "../../config/constants";
import countries_with_codes from "../../config/countries_with_codes";
import CustomImage from "../Shared/CustomImage";
import { useGetSchoolProfileQuery } from "../../lib/api/Schools/schoolsEndpoints";
import { useSelector } from "react-redux";
import { useWindowSize } from "../../helpers/useWindowSize";

const NewStudentForm = ({
	onFinish,
	form,
	academicYears,
	classes,
	streams,
	setClassroomId,
	uploadLoading,
	isClassLoading,
	isStreamLoading,
	isAcademicYearsLoading,
	handleUploadProfile,
	setSelectedCountry,
	imgURL,
}) => {
	const { data: schoolProfile, isLoading } = useGetSchoolProfileQuery();

	const lang = useSelector((state) => state?.translation?.payload);

	const handleClassroomIdChange = (value) => {
		setClassroomId(value);
		form.setFieldsValue({ streamId: "" });
	};

	useEffect(() => {
		if (streams?.payload?.items?.length) {
			form.setFieldsValue({
				streamId: streams?.payload?.items[0]?.id,
			});
		}
	}, [form, streams?.payload?.items]);

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

	const handleCountryChange = (country) => {
		setSelectedCountry(countries_with_codes?.find((c) => c.name === country));
	};

	const { width } = useWindowSize();
	const isScreenSmall = width <= 1024;

	return (
		<Form form={form} name="add-student" onFinish={onFinish}>
			<p className="text-gray-300 mb-4">
				{lang?.students_pg?.modals?.personal_info}
			</p>

			<Row align="middle" wrap={false} gutter={24}>
				<Col className="w-[100%]">
					<CustomInput
						label={lang?.students_pg?.modals?.full_name}
						placeholder={`${lang?.students_pg?.modals?.full_name}...`}
						name="fullName"
						rules={requiredField("Full name")}
					/>
				</Col>
			</Row>

			<Row align="middle" wrap={isScreenSmall} gutter={24}>
				<Col className={`${isScreenSmall ? "w-[100%]" : "w-[50%]"}`}>
					<CustomInput
						label={lang?.students_pg?.modals?.gender}
						type="select"
						name="gender"
						options={[
							{ key: "null", value: "", label: "Select gender" },
							{ key: "Male", value: "MALE", label: "Male" },
							{ key: "Female", value: "FEMALE", label: "Female" },
						]}
						defaultValue=""
						rules={requiredField("Gender")}
					/>
				</Col>

				<Col className={`${isScreenSmall ? "w-[100%]" : "w-[50%]"}`}>
					<CustomInput
						label={lang?.students_pg?.modals?.dob}
						type="date"
						name="dob"
						rules={requiredField("DOB")}
					/>
				</Col>
			</Row>

			<Row
				align={`${imgURL && !uploadLoading ? "top" : "middle"}`}
				wrap={false}
				gutter={24}
			>
				<Col flex={1}>
					<CustomInput
						label={lang?.students_pg?.modals?.profile}
						type="file"
						placeholder="Select to upload"
						name="passportPhoto"
						inputType="file"
						isLoading={uploadLoading}
						onChange={handleUploadProfile}
					/>
				</Col>

				{(uploadLoading || imgURL) && (
					<Col>
						{uploadLoading ? (
							<LoadingOutlined
								style={{ fontSize: 24, marginTop: "16px" }}
								spin
							/>
						) : (
							imgURL && (
								<CustomImage
									src={imgURL}
									width={38}
									height={38}
									className="object-cover mt-[32px] rounded"
								/>
							)
						)}
					</Col>
				)}
			</Row>

			<p className="text-gray-300 my-4">
				{lang?.students_pg?.modals?.contact_info}
			</p>

			<Row align="middle" wrap={isScreenSmall} gutter={24}>
				<Col className={`${isScreenSmall ? "w-[100%]" : "w-[50%]"}`}>
					<CustomInput
						label={lang?.students_pg?.modals?.email}
						placeholder="example@company.domain"
						name="email"
						rules={requiredField("Email")}
					/>
				</Col>

				<Col className={`${isScreenSmall ? "w-[100%]" : "w-[50%]"}`}>
					<CustomInput
						label={lang?.students_pg?.modals?.address}
						placeholder={`${lang?.students_pg?.modals?.address}...`}
						name="address"
						rules={requiredField("Address")}
					/>
				</Col>
			</Row>

			<Row align="middle" wrap={isScreenSmall} gutter={24}>
				<Col className={`${isScreenSmall ? "w-[100%]" : "w-[50%]"}`}>
					<CustomInput
						label={lang?.students_pg?.modals?.country_name}
						placeholder="Select country"
						type="select"
						name="countryName"
						showSearch={true}
						onChange={handleCountryChange}
						options={countries_with_codes?.map((country) => ({
							...country,
							index: country?.name,
							value: country?.name,
							key: country?.name,
						}))}
						rules={requiredField("Country")}
					/>
				</Col>

				<Col className={`${isScreenSmall ? "w-[100%]" : "w-[50%]"}`}>
					<CustomInput
						label={lang?.students_pg?.modals?.parent_phone_number}
						placeholder={`${lang?.students_pg?.modals?.parent_phone_number}...`}
						name="parentPhoneNumber"
						rules={requiredField("Parent phone")}
					/>
				</Col>
			</Row>

			<Row align="middle" wrap={isScreenSmall} gutter={24}>
				<Col className={`${isScreenSmall ? "w-[100%]" : "w-[50%]"}`}>
					<CustomInput
						label={lang?.students_pg?.modals?.first_contact_phone}
						placeholder={`${lang?.students_pg?.modals?.first_contact_phone}...`}
						name="firstContactPhone"
						rules={requiredField("First contact phone")}
					/>
				</Col>

				<Col className={`${isScreenSmall ? "w-[100%]" : "w-[50%]"}`}>
					<CustomInput
						label={lang?.students_pg?.modals?.second_contact_phone}
						placeholder={`${lang?.students_pg?.modals?.second_contact_phone}...`}
						name="secondContactPhone"
						rules={requiredField("Second contact phone")}
					/>
				</Col>
			</Row>

			<p className="text-gray-300 my-4">Academic info</p>

			{schoolProfile?.payload?.hasStudentIds && (
				<Row align="middle" wrap={false} gutter={24}>
					<Col className="w-[100%]">
						<CustomInput
							placeholder={lang?.students_pg?.modals?.student_identifier}
							name="studentIdentifier"
							label={`${lang?.students_pg?.modals?.student_identifier}...`}
							isLoading={isLoading}
							rules={requiredField("Student identifier")}
						/>
					</Col>
				</Row>
			)}

			<Row align="middle" wrap={isScreenSmall} gutter={24}>
				<Col className={`${isScreenSmall ? "w-[100%]" : "w-[50%]"}`}>
					<CustomInput
						type="select"
						name="academicYearId"
						label={lang?.students_pg?.modals?.academic_year}
						isLoading={isAcademicYearsLoading}
						rules={requiredField("Academic year")}
						options={academicYearsList}
					/>
				</Col>

				<Col className={`${isScreenSmall ? "w-[100%]" : "w-[50%]"}`}>
					<CustomInput
						label={lang?.students_pg?.modals?.term}
						type="select"
						name="academicTerm"
						options={[...termOptions]}
						placeholder="Select term"
						rules={requiredField("Term")}
					/>
				</Col>
			</Row>

			<Row align="middle" wrap={isScreenSmall} gutter={24}>
				<Col className={`${isScreenSmall ? "w-[100%]" : "w-[50%]"}`}>
					<CustomInput
						label={lang?.students_pg?.modals?.class}
						name="classroomId"
						type="select"
						placeholder="Please select"
						onChange={handleClassroomIdChange}
						isLoading={isClassLoading}
						rules={requiredField("Class")}
						options={classList}
					/>
				</Col>

				<Col className={`${isScreenSmall ? "w-[100%]" : "w-[50%]"}`}>
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

NewStudentForm.propTypes = {
	onFinish: PropTypes.func,
	form: PropTypes.object,
	academicYears: PropTypes.object,
	classes: PropTypes.object,
	streams: PropTypes.object,
	setClassroomId: PropTypes.string,
	uploadLoading: PropTypes.bool,
	isClassLoading: PropTypes.bool,
	isStreamLoading: PropTypes.bool,
	isAcademicYearsLoading: PropTypes.bool,
	handleUploadProfile: PropTypes.func,
	setSelectedCountry: PropTypes.func,
	itemToEdit: PropTypes.any,
};

export default NewStudentForm;
