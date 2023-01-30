import React from "react";
import PropTypes from "prop-types";

const ContentNavbar = ({ left, right }) => {
	return (
		<div className="flex justify-between items-center">
			<div className="">{left}</div>
			<div className="">{right}</div>
		</div>
	);
};

ContentNavbar.propTypes = {
	left: PropTypes.element,
	right: PropTypes.element,
};

export default ContentNavbar;
