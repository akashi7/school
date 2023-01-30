import Notification from "antd/lib/notification";
import PropTypes from "prop-types";

const Notify = ({
	placement = "bottomRight",
	description,
	message = "Notification",
	type = "success",
}) => {
	Notification.destroy();

	Notification[type]({
		message,
		description,
		placement,
	});
};

Notify.propTypes = {
	placement: PropTypes.string,
	description: PropTypes.string,
	message: PropTypes.string,
	type: PropTypes.oneOf(["success", "info", "warning", "error"]),
};

export default Notify;
