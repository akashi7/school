import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "antd/lib/form";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import CustomInput from "../Shared/CustomInput";
import CustomImage from "../Shared/CustomImage";
import CustomButton from "../Shared/CustomButton";
import requiredField from "../../helpers/requiredField";
import { useLoginMutation } from "../../lib/api/Auth/authEndpoints";
import handleAPIRequests from "../../helpers/handleAPIRequests";
import { useRouter } from "next/router";
import routes from "../../config/routes";
import countries_with_codes from "../../config/countries_with_codes";
import { _ns_token_ } from "../../config/constants";

const StudentLogin = ({ setActiveLogin, lang }) => {
	const [countryCode, setCountryCode] = useState(null);

	const [form] = Form.useForm();
	const router = useRouter();

	const [login, { isLoading }] = useLoginMutation();

	const onSuccess = (res) => {
		if (res.payload) {
			localStorage.setItem(_ns_token_, res?.payload?.accessToken || "");
			router.push(routes.dashboard.url);
		}
	};

	const handleCountryChange = (country) => {
		setCountryCode(countries_with_codes?.find((c) => c.name === country));
	};

	const onFinish = (values) => {
		handleAPIRequests({
			request: login,
			url: "student",
			...values,
			countryCode: countryCode?.code,
			onSuccess: onSuccess,
		});
	};

	return (
		<Form
			onFinish={onFinish}
			name="login-form"
			form={form}
			className="w-[100%]"
		>
			<Row
				justify="center"
				align="middle"
				gutter={24}
				className="mt-8 w-[100%] mb-6"
				wrap={false}
			>
				<Col onClick={() => setActiveLogin(null)}>
					<CustomImage
						src="/icons/back.svg"
						className="cursor-pointer bg-gray-500 hover:bg-gray-600 p-[6px] mt-1 rounded"
					/>
				</Col>

				<Col className="font-[500] text-dark text-[24px] truncate" flex={1}>
					{lang?.auth?.as_student?.title}
				</Col>
			</Row>

			<div className="w-[100%]">
				<CustomInput
					label={lang?.auth?.as_student?.country_name}
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
			</div>

			<div className="w-[100%]">
				<CustomInput
					label={lang?.auth?.as_student?.identifier}
					name="studentIdentifier"
					placeholder="Identifier"
					rules={requiredField("Identifier")}
				/>
			</div>

			<CustomButton
				type="primary"
				className="w-[100%] h-[52px] font-bold mt-2 mb-4"
				htmlType="submit"
				loading={isLoading}
			>
				{lang?.auth?.as_student?.button}
			</CustomButton>
		</Form>
	);
};

StudentLogin.propTypes = {
	setActiveLogin: PropTypes.func,
};

export default StudentLogin;
