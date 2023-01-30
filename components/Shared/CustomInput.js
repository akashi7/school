import React from "react";
import Form from "antd/lib/form";
import Input from "antd/lib/input";
import Select from "antd/lib/select";
import PropTypes from "prop-types";

const { Option } = Select;

const CustomInput = ({
	label = "",
	placeholder,
	type = "normal",
	inputType,
	value,
	width,
	defaultValue,
	options = [],
	name,
	rules,
	onChange = () => null,
}) => {
	const NormalInput = (
		<div className="mb-[-10px]">
			{label && (
				<label className="text-[18px] text-black font-medium mb-2 block">
					{label}
				</label>
			)}

			<Form.Item name={name} rules={rules}>
				<Input
					value={value}
					type={inputType}
					placeholder={placeholder || "Type"}
					className="rounded h-[40px]"
					onChange={({ target }) => onChange(target.value)}
				/>
			</Form.Item>
		</div>
	);

	const SelectInput = (
		<div className="mb-[-10px]">
			{label && (
				<label className="text-[18px] text-black font-medium mb-2 block">
					{label}
				</label>
			)}

			<Form.Item name={name} rules={rules}>
				<Select
					value={value}
					onChange={(value) => onChange(value)}
					className="rounded h-[40px] border border-gray-300 flex items-center"
					options={options}
					defaultValue={defaultValue}
					name={name}
				>
					{options.map((option) => (
						<Option key={option?.index} value={option?.value}>
							{option?.label}
						</Option>
					))}
				</Select>
			</Form.Item>
		</div>
	);

	const SelectMultipleInput = (
		<div className="mb-[-10px]">
			{label && (
				<label className="text-[18px] text-black font-medium mb-2 block">
					{label}
				</label>
			)}

			<Form.Item name={name} rules={rules}>
				<Select
					className="border border-gray-300 rounded"
					mode="multiple"
					size="large"
					placeholder="Please select"
					defaultValue={defaultValue}
					style={{
						width: "100%",
					}}
					options={options}
				/>
			</Form.Item>
		</div>
	);

	const SmallSelectInput = (
		<div className="h-[46px] border p-3 border-gray rounded flex items-center gap-2">
			<label className="text-[12px] text-black">{label}:</label>

			<Form.Item name={name} rules={rules}>
				<Select
					value={value}
					onChange={(value) => onChange(value)}
					className={`border-none mt-5 ${
						width ? `w-[${width}]` : "w-[100px]"
					} rounded`}
					style={{ minWidth: "60px" }}
					options={options}
					name={name}
				>
					{options.map((option) => (
						<Option key={option?.index} value={option?.value}>
							{option?.label}
						</Option>
					))}
				</Select>
			</Form.Item>
		</div>
	);

	switch (type) {
		case "small-select":
			return SmallSelectInput;
			break;

		case "select":
			return SelectInput;
			break;

		case "select-multiple":
			return SelectMultipleInput;
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
	name: PropTypes.string,
	onChange: PropTypes.func,
};

export default CustomInput;