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

	return (
		<Form form={form} name="add-student" onFinish={onFinish}>
			<p className="text-gray-300 mb-4">Personal info</p>

			<Row align="middle" wrap={false} gutter={24}>
				<Col className="w-[100%]">
					<CustomInput
						label="Full name"
						placeholder="Full name..."
						name="fullName"
						rules={requiredField("Full name")}
					/>
				</Col>
			</Row>

			<Row align="middle" wrap={false} gutter={24}>
				<Col className="w-[50%]">
					<CustomInput
						label="Gender"
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

				<Col className="w-[50%]">
					<CustomInput
						label="DOB"
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
						label="Profile"
						type="file"
						placeholder="Select to upload"
						name="passportPhoto"
						inputType="file"
						isLoading={uploadLoading}
						onChange={handleUploadProfile}
						rules={!imgURL && requiredField("Passport")}
					/>
				</Col>

				<Col>
					{uploadLoading ? (
						<LoadingOutlined style={{ fontSize: 24, marginTop: "16px" }} spin />
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
			</Row>

			<p className="text-gray-300 my-4">Contact info</p>

			<Row align="middle" wrap={false} gutter={24}>
				<Col className="w-[50%]">
					<CustomInput
						label="Email"
						placeholder="example@company.domain"
						name="email"
						rules={requiredField("Email")}
					/>
				</Col>

				<Col className="w-[50%]">
					<CustomInput
						label="Address"
						placeholder="Type location..."
						name="address"
						rules={requiredField("Last name")}
					/>
				</Col>
			</Row>

			<Row align="middle" wrap={false} gutter={24}>
				<Col className="w-[50%]">
					<CustomInput
						label="Country name"
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

				<Col className="w-[50%]">
					<CustomInput
						label="Parent phone number"
						placeholder="Phone number..."
						name="parentPhoneNumber"
						rules={requiredField("Parent phone")}
					/>
				</Col>
			</Row>

			<Row align="middle" wrap={false} gutter={24}>
				<Col className="w-[50%]">
					<CustomInput
						label="First contact phone"
						placeholder="Phone number..."
						name="firstContactPhone"
						rules={requiredField("First contact phone")}
					/>
				</Col>

				<Col className="w-[50%]">
					<CustomInput
						label="Second contact phone"
						placeholder="Phone number..."
						name="secondContactPhone"
						rules={requiredField("Second contact phone")}
					/>
				</Col>
			</Row>

			<p className="text-gray-300 my-4">Academic info</p>

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
						options={[...termOptions]}
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
						onChange={handleClassroomIdChange}
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
