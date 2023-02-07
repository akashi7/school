import React from "react";
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
import { _ns_token_ } from "../../config/constants";

const SchoolLogin = ({ setActiveLogin }) => {
	const [form] = Form.useForm();
	const router = useRouter();

	const [login, { isLoading }] = useLoginMutation();

	const onSuccess = (res) => {
		if (res.payload) {
			localStorage.setItem(_ns_token_, res?.payload?.accessToken || "");
			router.push(routes.dashboard.url);
		}
	};

	const onFinish = (values) => {
		handleAPIRequests({
			request: login,
			...values,
			countryCode: "RW",
			onSuccess: onSuccess,
		});
	};

	return (
		<Form onFinish={onFinish} name="login-form" form={form}>
			<Row
				justify="center"
				align="middle"
				gutter={24}
				className="mt-8 w-[100%] mb-6"
			>
				<Col onClick={() => setActiveLogin(null)}>
					<CustomImage
						src="/icons/back.svg"
						className="cursor-pointer bg-gray-500 hover:bg-gray-600 p-[6px] mt-1 rounded"
					/>
				</Col>

				<Col className="font-medium text-dark text-[24px]" flex={1}>
					Login as school
				</Col>
			</Row>

			<div className="w-[100%]">
				<CustomInput
					label="Username"
					name="username"
					placeholder="john@example.domain"
					rules={requiredField("Username")}
				/>
			</div>

			<div className="w-[100%]">
				<CustomInput
					label="Password"
					inputType="password"
					placeholder="*** *** ***"
					name="password"
					rules={requiredField("Password")}
				/>
			</div>

			<CustomButton
				type="primary"
				className="w-[100%] h-[52px] font-bold mt-2 mb-4"
				htmlType="submit"
				loading={isLoading}
			>
				Login
			</CustomButton>
		</Form>
	);
};

SchoolLogin.propTypes = {
	setActiveLogin: PropTypes.func,
};

export default SchoolLogin;
