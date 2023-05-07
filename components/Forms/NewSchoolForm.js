import React from "react";
import Form from "antd/lib/form";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { LoadingOutlined } from "@ant-design/icons";
import CustomInput from "../Shared/CustomInput";
import requiredField from "../../helpers/requiredField";
import countries_with_codes from "../../config/countries_with_codes";
import CustomImage from "../Shared/CustomImage";

const NewSchoolForm = ({
	onFinish,
	form,
	uploadLoading,
	handleUploadProfile,
	imgURL,
	setSelectedCountry,
	lang,
	isScreenSmall,
}) => {
	const handleCountryChange = (country) => {
		setSelectedCountry(countries_with_codes?.find((c) => c.name === country));
	};

	return (
		<Form form={form} name="add-school" onFinish={onFinish}>
			<Row align="middle" wrap={isScreenSmall} gutter={24}>
				<Col className={`${isScreenSmall ? "w-[100%]" : "w-[50%]"}`}>
					<CustomInput
						label={lang?.schools_pg?.modals?.school_name}
						placeholder={`${lang?.schools_pg?.modals?.school_name}...`}
						name="schoolName"
						rules={requiredField("School name")}
					/>
				</Col>

				<Col className={`${isScreenSmall ? "w-[100%]" : "w-[50%]"}`}>
					<CustomInput
						label={lang?.schools_pg?.modals?.school_title}
						placeholder="School title..."
						name="schoolTitle"
						rules={requiredField("School title")}
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
						label={lang?.schools_pg?.modals?.school_logo}
						type="file"
						placeholder="Select to upload"
						name="schoolLogo"
						inputType="file"
						isLoading={uploadLoading}
						onChange={handleUploadProfile}
						rules={!imgURL && requiredField("School logo")}
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

			<Row align="middle" wrap={isScreenSmall} gutter={24}>
				<Col className={`${isScreenSmall ? "w-[100%]" : "w-[50%]"}`}>
					<CustomInput
						label={lang?.schools_pg?.modals?.school_type}
						type="select"
						name="schoolType"
						showSearch={true}
						options={[
							{
								index: "NURSERY",
								value: "NURSERY",
								key: "NURSERY",
							},

							{
								index: "SECONDARY",
								value: "SECONDARY",
								key: "SECONDARY",
							},

							{
								index: "TVET",
								value: "TVET",
								key: "TVET",
							},

							{
								index: "UNIVERSITY",
								value: "UNIVERSITY",
								key: "UNIVERSITY",
							},
						]}
						rules={requiredField("Does student have ids field")}
					/>
				</Col>

				<Col className={`${isScreenSmall ? "w-[100%]" : "w-[50%]"}`}>
					<CustomInput
						label={lang?.schools_pg?.modals?.has_student_ids}
						type="select"
						name="hasStudentIds"
						showSearch={true}
						options={[
							{
								index: "YES",
								value: "YES",
								key: "YES",
							},
							{
								index: "NO",
								value: "NO",
								key: "NO",
							},
						]}
						rules={requiredField("Does student have ids field")}
					/>
				</Col>
			</Row>

			<Row align="middle" wrap={isScreenSmall} gutter={24}>
				<Col className={`${isScreenSmall ? "w-[100%]" : "w-[50%]"}`}>
					<CustomInput
						label={lang?.schools_pg?.modals?.country_name}
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
						label={lang?.schools_pg?.modals?.school_address}
						placeholder={`${lang?.schools_pg?.modals?.school_address}...`}
						name="address"
						rules={requiredField("School address")}
					/>
				</Col>
			</Row>

			<Row align="middle" wrap={isScreenSmall} gutter={24}>
				<Col className={`${isScreenSmall ? "w-[100%]" : "w-[50%]"}`}>
					<CustomInput
						label={lang?.schools_pg?.modals?.phone_number}
						placeholder={`${lang?.schools_pg?.modals?.phone_number}...`}
						name="phone"
						rules={requiredField("Phone number")}
					/>
				</Col>

				<Col className={`${isScreenSmall ? "w-[100%]" : "w-[50%]"}`}>
					<CustomInput
						label={lang?.schools_pg?.modals?.email}
						placeholder={`${lang?.schools_pg?.modals?.email}...`}
						name="email"
						rules={requiredField("Email")}
					/>
				</Col>
			</Row>
		</Form>
	);
};

export default NewSchoolForm;
