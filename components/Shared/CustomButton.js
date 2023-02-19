import React from "react";
import Button from "antd/lib/button";
import PropTypes from "prop-types";

const CustomButton = ({
	disabled,
	icon,
	size,
	target,
	type,
	onClick,
	children,
	htmlType,
	className,
	loading,
	form,
}) => {
	const PrimaryButton = () => {
		return (
			<Button
				className={`${className} bg-primary font-medium text-white text-[14px] px-6 h-[42px] rounded-[4px] hover:text-white hover:bg-primary_hover border-none hover:border-none`}
				disabled={disabled}
				icon={icon}
				size={size}
				target={target}
				type={type}
				onClick={onClick}
				htmlType={htmlType}
				loading={loading}
				form={form}
			>
				{children}
			</Button>
		);
	};

	const EditButton = () => {
		return (
			<Button
				style={{ background: "rgba(0, 176, 175, 0.1)", color: "#00B0AF" }}
				className={`${className} text-white font-medium text-[12px] px-5 h-[38px] rounded-[4px] font-semibold hover:text-edit_blue hover:bg-primary_hover border-none hover:border-none`}
				disabled={disabled}
				icon={icon}
				size={size}
				target={target}
				type={type}
				onClick={onClick}
				htmlType={htmlType}
				loading={loading}
			>
				{children}
			</Button>
		);
	};

	const DeleteButton = () => {
		return (
			<Button
				style={{ background: "rgba(235, 96, 36, 0.1)", color: "#EB6024" }}
				className={`${className} text-white font-medium text-[12px] px-5 h-[38px] rounded-[4px] font-semibold hover:text-delete_red hover:bg-delete_red border-none hover:border-none`}
				disabled={disabled}
				icon={icon}
				size={size}
				target={target}
				type={type}
				onClick={onClick}
				htmlType={htmlType}
				loading={loading}
			>
				{children}
			</Button>
		);
	};

	const DangerButton = () => {
		return (
			<Button
				className={`${className} text-white font-bold text-[12px] px-5 h-[38px] w-[100px] rounded-[4px] font-semibold bg-red border-none hover:border-none`}
				disabled={disabled}
				icon={icon}
				size={size}
				target={target}
				type={type}
				onClick={onClick}
				htmlType={htmlType}
				loading={loading}
			>
				{children}
			</Button>
		);
	};

	const ViewButton = () => {
		return (
			<Button
				className={`${className} bg-grey font-medium text-dark font-semibold text-[12px] px-5 h-[38px] rounded-[4px] hover:text-dark hover:bg-grey border-none hover:border-none`}
				disabled={disabled}
				icon={icon}
				size={size}
				target={target}
				type={type}
				onClick={onClick}
				htmlType={htmlType}
				loading={loading}
			>
				{children}
			</Button>
		);
	};

	switch (type) {
		case "primary":
			return <PrimaryButton />;
			break;

		case "view":
			return <ViewButton />;
			break;

		case "edit":
			return <EditButton />;
			break;

		case "delete":
			return <DeleteButton />;
			break;

		case "danger":
			return <DangerButton />;
			break;

		default:
			return <ViewButton />;
			break;
	}
};

CustomButton.propTypes = {
	disabled: PropTypes.bool,
	icon: PropTypes.element,
	size: PropTypes.string,
	target: PropTypes.string,
	type: PropTypes.string,
	onClick: PropTypes.func,
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	htmlType: PropTypes.string,
	className: PropTypes.string,
	loading: PropTypes.bool,
};

export default CustomButton;
