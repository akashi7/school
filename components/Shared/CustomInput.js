import React from "react";
import Input from "antd/lib/input";
import PropTypes from "prop-types";

const CustomInput = ({ label = "", placeholder }) => {
	return (
		<div>
			<label className="text-[18px] mb-2 block text-black">{label}</label>
			<Input placeholder={placeholder || "Type"} className="rounded h-[46px]" />
		</div>
	);
};

CustomInput.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string,
};

export default CustomInput;
