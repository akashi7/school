import React from "react";
import PropTypes from "prop-types";
import Modal from "antd/lib/modal";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import CustomButton from "./CustomButton";
import handleAPIRequests from "../../helpers/handleAPIRequests";
import { useSelector } from "react-redux";
import { useWindowSize } from "../../helpers/useWindowSize";

const WarningModal = ({
	isVisible,
	setIsVisible,
	loading = false,
	handleCancel,
	destroyOnClose,
	width = 500,
	warningMessage,
	warningKey,
	itemToDelete,
	streamId,
	onSuccess,
	request,
	message,
}) => {
	const onCancel = () => {
		setIsVisible(false);
	};

	const lang = useSelector((state) => state?.translation?.payload);

	const { width: size } = useWindowSize();
	const isScreenSmall = size <= 1024;

	const handleDelete = () => {
		handleAPIRequests({
			request,
			id: itemToDelete,
			streamId: streamId,
			notify: true,
			message,
			onSuccess: onSuccess || onCancel,
		});
	};

	return (
		<Modal
			className="sn-modal"
			width={width}
			footer={
				<Row
					align="middle"
					justify="space-between"
					gutter={12}
					className={`${isScreenSmall ? "px-[12px] pb-8" : "px-[42px] pb-12"}`}
				>
					<Col>
						<CustomButton onClick={onCancel} type="view" disabled={loading}>
							{lang?.dashboard_shared?.buttons?.mistake}
						</CustomButton>
					</Col>

					<Col>
						<CustomButton
							type="danger"
							onClick={handleDelete}
							loading={loading}
						>
							{loading
								? lang?.dashboard_shared?.buttons?.deleting
								: lang?.dashboard_shared?.buttons?.yes}
						</CustomButton>
					</Col>
				</Row>
			}
			open={isVisible}
			onCancel={!loading && (onCancel || handleCancel)}
			centered
			maskClosable={!loading}
			closable={false}
			destroyOnClose={destroyOnClose}
			bodyStyle={{
				padding: isScreenSmall ? "32px 24px 12px" : "64px 64px 32px",
			}}
		>
			<p className="text-gray-500 text-[20px] mb-2">
				{warningMessage}{" "}
				<span className="text-dark font-medium">{warningKey}</span>?
			</p>

			<span className="text-[12px] text-gray-400">
				{lang?.dashboard_shared?.modals?.delete_modal?.desc}
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
	itemToDelete: PropTypes.string,
	request: PropTypes.func,
	streamId: PropTypes.string,
	onSuccess: PropTypes.func,
};

export default WarningModal;
