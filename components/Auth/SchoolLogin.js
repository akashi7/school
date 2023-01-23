import React from "react";
import PropTypes from "prop-types";
import CustomInput from "../Shared/CustomInput";
import CustomImage from "../Shared/CustomImage";
import CustomButton from "../Shared/CustomButton";

export const SchoolLogin = ({ setActiveLogin }) => {
	return (
		<>
			<div
				className="flex items-center mt-8 mb-6 cursor-pointer"
				onClick={() => setActiveLogin(null)}
			>
				<CustomImage
					src="/icons/back.svg"
					className="bg-gray-500 hover:bg-gray-600 p-[6px] rounded"
				/>
				<p className="font-medium text-dark text-[24px]">Login as school</p>
			</div>

			<div className="w-[100%]">
				<CustomInput label="Email" placeholder="john@example.domain" />
			</div>

			<div className="w-[100%]">
				<CustomInput
					label="Password"
					inputType="password"
					placeholder="*** *** ***"
				/>
			</div>

			<CustomButton
				type="primary"
				className="w-[100%] h-[52px] font-bold mt-2 mb-4"
			>
				Login
			</CustomButton>
		</>
	);
};

SchoolLogin.propTypes = {
	setActiveLogin: PropTypes.func,
};
