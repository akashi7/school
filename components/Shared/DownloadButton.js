import React from "react";
import PropTypes from "prop-types";
import CustomImage from "./CustomImage";

const DownloadButton = ({ onClick }) => {
	return (
		<div
			className=" bg-dark rounded p-2 flex items-center justify-center cursor-pointer"
			onClick={onClick}
		>
			<CustomImage src="/icons/download.svg" width={24} className="auto" />
		</div>
	);
};

DownloadButton.propTypes = {
	onClick: PropTypes.func,
};

export default DownloadButton;
