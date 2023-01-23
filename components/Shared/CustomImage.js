import React from "react";
import Image from "antd/lib/image";
import PropTypes from "prop-types";

const CustomImage = ({
	src,
	alt,
	width,
	height,
	preview,
	placeholder,
	className,
	style,
	onClick,
}) => {
	return (
		<Image
			onClick={onClick}
			style={style}
			src={src}
			alt={alt || ""}
			width={width}
			height={height}
			preview={!!preview}
			placeholder={placeholder || ""}
			className={className}
		/>
	);
};

CustomImage.propTypes = {
	src: PropTypes.string,
	alt: PropTypes.string,
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	preview: PropTypes.bool,
	placeholder: PropTypes.string,
	className: PropTypes.string,
	onClick: PropTypes.func,
	style: PropTypes.any,
};

export default CustomImage;
