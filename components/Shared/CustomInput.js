import React from "react";
import Input from "antd/lib/input";
import Select from "antd/lib/select";
import PropTypes from "prop-types";

const { Option } = Select;

const CustomInput = ({
	label = "",
	placeholder,
	type = "normal",
	inputType,
	width,
	defaultValue,
	options = [],
}) => {
	const NormalInput = (
		<div className="mb-[-10px]">
			{label && (
				<label className="text-[18px] text-black mb-2 block">{label}</label>
			)}

			<Input
				type={inputType}
				placeholder={placeholder || "Type"}
				className="rounded h-[46px]"
			/>
		</div>
	);

	const SelectInput = (
		<div className="h-[46px] border p-3 border-gray rounded flex items-center gap-2">
			<label className="text-[12px] text-black">{label}:</label>

			<Select
				defaultValue={defaultValue}
				className={`border-none ${
					width ? `w-[${width}]` : "w-[100px]"
				} rounded`}
				options={options}
			>
				{options.map((option) => (
					<Option key={option?.index} value={option?.value}>
						{option?.name}
					</Option>
				))}
			</Select>
		</div>
	);

	switch (type) {
		case "select":
			return SelectInput;
			break;

		default:
			return NormalInput;
			break;
	}
};

CustomInput.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string,
	type: PropTypes.string,
	width: PropTypes.string,
	defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	label: PropTypes.string,
};

export default CustomInput;
