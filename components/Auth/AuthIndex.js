import React from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import PropTypes from "prop-types";
import { login_options } from "../../config/constants";

const AuthIndex = ({ setActiveLogin }) => {
	return (
		<>
			<p className="font-medium text-dark text-[24px] mt-8 mb-6">
				Continue as:
			</p>

			<Row
				align="middle"
				className="w-[100%] m-auto gap-12 mb-8"
				justify="center"
			>
				<Col
					onClick={() => setActiveLogin(login_options.school)}
					className="uppercase p-6 px-12 border border-gray-200 bg-gray-100 hover:bg-gray-200 w-[220px] text-center font-medium cursor-pointer"
				>
					School
				</Col>

				<Col
					onClick={() => setActiveLogin(login_options.admin)}
					className="uppercase p-6 px-12 border border-gray-200 bg-gray-100 hover:bg-gray-200 w-[220px] text-center font-medium cursor-pointer"
				>
					Admin
				</Col>

				<Col
					onClick={() => setActiveLogin(login_options.parent)}
					className="uppercase p-6 px-12 border border-gray-200 bg-gray-100 hover:bg-gray-200 w-[220px] text-center font-medium cursor-pointer"
				>
					Parent
				</Col>

				<Col
					onClick={() => setActiveLogin(login_options.student)}
					className="uppercase p-6 px-12 border border-gray-200 bg-gray-100 hover:bg-gray-200 w-[220px] text-center font-medium cursor-pointer"
				>
					Student
				</Col>
			</Row>
		</>
	);
};

AuthIndex.propTypes = {
	setActiveLogin: PropTypes.func,
};

export default AuthIndex;
