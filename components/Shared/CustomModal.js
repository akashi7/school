import React from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Modal from "antd/lib/modal";
import PropTypes from "prop-types";
import CustomImage from "./CustomImage";
import { useWindowSize } from "../../helpers/useWindowSize";

const CustomModal = ({
	isVisible,
	setIsVisible,
	loading = false,
	title = "",
	footerWidth = 10,
	footerContent,
	handleCancel,
	destroyOnClose,
	width = 500,
	subTitle,
	subTitleKey,
	children,
}) => {
	const onCancel = () => {
		setIsVisible(false);
	};

	const { width: size } = useWindowSize();
	const isScreenSmall = size <= 1024;

	return (
		<Modal
			className="sn-modal my-12"
			title={
				<div
					className={`flex justify-between items-center ${
						isScreenSmall ? "px-2 pt-6" : "px-[42px] pt-12"
					} pb-0`}
				>
					<div>
						<span className="font-bold block text-[24px] lg:text-[32px] text-dark  mb-2">
							{title}
						</span>

						<p className="text-sm text-gray-500 font-light">
							{subTitle}{" "}
							<span className="text-dark font-medium">{subTitleKey}</span>
						</p>
					</div>
					{!loading && title && (
						<CustomImage
							onClick={onCancel}
							src="/icons/close.svg"
							width={30}
							className="cursor-pointer"
						/>
					)}
				</div>
			}
			width={width}
			footer={
				footerContent ? (
					<Row
						justify="end"
						className={`${
							isScreenSmall ? "px-[18px] pb-6" : "px-[42px] pb-12"
						}`}
					>
						<Col
							xs={24}
							sm={24}
							md={10}
							lg={footerWidth}
							xl={footerWidth}
							xxl={footerWidth}
						>
							{footerContent}
						</Col>
					</Row>
				) : (
					false
				)
			}
			open={isVisible}
			onCancel={handleCancel || onCancel}
			centered
			maskClosable={!loading}
			closable={false}
			destroyOnClose={destroyOnClose}
			bodyStyle={{ padding: isScreenSmall ? "24px 32px 2px" : "32px 64px 6px" }}
		>
			{children}
		</Modal>
	);
};

CustomModal.propTypes = {
	isVisible: PropTypes.bool,
	setIsVisible: PropTypes.func,
	children: PropTypes.element,
	loading: PropTypes.bool,
	title: PropTypes.string,
	footerWidth: PropTypes.number,
	footerContent: PropTypes.element,
	handleCancel: PropTypes.func,
	destroyOnClose: PropTypes.bool,
	width: PropTypes.number,
};

export default CustomModal;
