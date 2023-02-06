import React from "react";
import Form from "antd/lib/form";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import CustomInput from "../Shared/CustomInput";
import requiredField from "../../helpers/requiredField";
import { termOptions } from "../../config/constants";

const NewStudentForm = ({
	onFinish,
	form,
	academicYears,
	classes,
	streams,
	setClassroomId,
}) => {
	const handleClassroomIdChange = (value) => {
		setClassroomId(value);
	};

	return (
		<Form form={form} name="add-student" onFinish={onFinish}>
			<p className="text-gray-300 mb-4">Personal info</p>

			<Row align="middle" wrap={false} gutter={24}>
				<Col className="w-[50%]">
					<CustomInput
						label="First name"
						placeholder="First name..."
						name="firstName"
						rules={requiredField("First name")}
					/>
				</Col>

				<Col className="w-[50%]">
					<CustomInput
						label="Last name"
						placeholder="Last name..."
						name="lastName"
						rules={requiredField("Last name")}
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

			<Row align="middle" wrap={false} gutter={24}>
				<Col className="w-[10clear
				0%]">
					<CustomInput
						label="Profile"
						placeholder="Select to upload"
						name="passportPhoto"
						rules={requiredField("Passport")}
					/>
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
						rules={requiredField("Country")}
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
						label="Parent phone number"
						placeholder="Phone number..."
						name="parentPhoneNumber"
						rules={requiredField("Parent phone")}
					/>
				</Col>

				<Col className="w-[50%]">
					<CustomInput
						label="First contact phone"
						placeholder="Phone number..."
						name="firstContactPhone"
						rules={requiredField("First contact phone")}
					/>
				</Col>
			</Row>

			<Row align="middle" wrap={false} gutter={24}>
				<Col className="w-[100%]">
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
						label="Term"
						type="select"
						name="academicTerm"
						options={[
							{ key: 0, value: "", label: "Select term" },
							...termOptions,
						]}
						rules={requiredField("Parent phone")}
					/>
				</Col>

				<Col className="w-[50%]">
					{academicYears?.payload?.totalItems && (
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

			<Row align="middle" wrap={false} gutter={24}>
				<Col
					className={`${
						streams?.payload?.items?.length ? "w-[50%]" : "w-[100%]"
					}`}
				>
					{classes?.payload?.items?.length && (
						<CustomInput
							label="Classes"
							name="classroomId"
							type="select"
							placeholder="Please select"
							onChange={handleClassroomIdChange}
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

				{streams?.payload?.items?.length && (
					<Col className="w-[50%]">
						<CustomInput
							type="select"
							label="Stream"
							options={[
								{ key: 0, value: "", label: "Select stream" },
								...streams?.payload?.items?.map((item) => ({
									key: item?.id,
									value: item?.id,
									label: item.name,
								})),
							]}
						/>
					</Col>
				)}
			</Row>
		</Form>
	);
};

export default NewStudentForm;
