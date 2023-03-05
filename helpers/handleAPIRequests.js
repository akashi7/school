import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Notify from "../components/Shared/Notification";
import { _ns_token_ } from "../config/constants";

const handleAPIRequests = ({
	request,
	message,
	onSuccess = () => null,
	onError = () => null,
	notify = false,
	...props
}) => {
	request({ ...props })
		.unwrap()
		.then((res) => {
			if (res) {
				onSuccess(res);
				if (notify) {
					Notify({
						message: "Success",
						description: message || res?.message || "Operation successful",
					});
				}
			}
		})
		.catch((err) => {
			onError(err);

			if (err.statusCode === 401) {
				localStorage.removeItem(_ns_token_);
				window.location.href = "/";
			}

			if (err?.data) {
				Notify({
					message: err?.data?.error || "Error",
					description:
						typeof err?.data?.message === "string"
							? err?.data?.message
							: err?.data?.message?.length >= 1
							? err?.data?.message[0]
							: "Something went wrong. Please try again later!",
					type: "error",
				});
			}
		});
};

handleAPIRequests.propTypes = {
	request: PropTypes.func,
	message: PropTypes.string,
	showSuccess: PropTypes.bool,
	onSuccess: PropTypes.func,
	onError: PropTypes.func,
	notify: PropTypes.bool,
};

export default handleAPIRequests;
