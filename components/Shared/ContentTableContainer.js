import React from "react";
import PropTypes from "prop-types";
import { useWindowSize } from "../../helpers/useWindowSize";

const ContentTableContainer = ({ children, className }) => {
	const { width } = useWindowSize();
	const isScreenSmall = width <= 1024;

	return (
		<div
			className={`${className} ${
				!isScreenSmall ? "border border-gray p-6 rounded mt-4" : "mt-8"
			}`}
		>
			{children}
		</div>
	);
};

ContentTableContainer.propTypes = {
	className: PropTypes.string,
	children: PropTypes.element,
};

export default ContentTableContainer;
