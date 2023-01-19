import React from "react";
import PropTypes from "prop-types";
import Modal from "antd/lib/modal";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import CustomButton from "./CustomButton";

const WarningModal = ({
	isVisible,
	setIsVisible,
	loading = false,
	handleCancel,
	destroyOnClose,
	width = 500,
	warningMessage,
	warningKey,
}) => {
	const onCancel = () => {
		setIsVisible(false);
	};

	return (
		<Modal
			className="sn-modal"
			width={width}
			footer={
				<Row align="middle" justify="space-between" gutter={12}>
					<Col>
						<CustomButton onClick={onCancel} type="view">
							No, that was a mistake!
						</CustomButton>
					</Col>

					<Col>
						<CustomButton type="danger">Yes</CustomButton>
					</Col>
				</Row>
			}
			open={isVisible}
			onCancel={onCancel || handleCancel}
			centered
			maskClosable={!loading}
			closable={false}
			destroyOnClose={destroyOnClose}
			bodyStyle={{ padding: "64px 64px 32px" }}
		>
			<p className="text-gray-500 text-[20px] mb-2">
				{warningMessage}{" "}
				<span className="text-dark font-medium">{warningKey}</span>?
			</p>

			<span className="text-[12px] text-gray-400">
				Know that this action is irreversible!
			</span>
		</Modal>
	);
};

WarningModal.propTypes = {
	isVisible: PropTypes.bool,
	setIsVisible: PropTypes.func,
	warningMessage: PropTypes.string,
	warningKey: PropTypes.string,
	loading: PropTypes.bool,
	handleCancel: PropTypes.func,
	destroyOnClose: PropTypes.bool,
	width: PropTypes.number,
};

export default WarningModal;
