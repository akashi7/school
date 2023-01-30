import React from "react";
import PropTypes from "prop-types";

const ContentTableContainer = ({ children, className }) => {
	return (
		<div className={`${className} border border-gray p-6 rounded mt-4`}>
			{children}
		</div>
	);
};

ContentTableContainer.propTypes = {
	className: PropTypes.string,
	children: PropTypes.element,
};

export default ContentTableContainer;
