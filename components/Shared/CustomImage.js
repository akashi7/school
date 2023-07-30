import React from "react";
import Image from "antd/lib/image";
import PropTypes from "prop-types";
import { GLOBAL_IMAGE_FALLBACK } from "../../config/constants";

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
			src={src||'https://st.depositphotos.com/2101611/4338/v/600/depositphotos_43381243-stock-illustration-male-avatar-profile-picture.jpg'}
			alt={alt || ""}
			width={width}
			height={height}
			preview={!!preview}
			placeholder={placeholder || ""}
			fallback={GLOBAL_IMAGE_FALLBACK}
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
