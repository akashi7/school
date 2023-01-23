import React from "react";
import PropTypes from "prop-types";
import CustomImage from "./CustomImage";

const GoBack = ({ onClick }) => {
	return (
		<div
			className="p-[8px] rounded bg-gray-500 flex items-center justify-space-between cursor-pointer"
			onClick={onClick}
		>
			<CustomImage src="/icons/back.svg" width={12} height={12} />
		</div>
	);
};

GoBack.propTypes = {
	onClick: PropTypes.func,
};

export default GoBack;
