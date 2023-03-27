import React from "react";

const Content = ({ children, isScreenSmall }) => {
	return (
		<div
			className="lg:rounded-tl-[32px] p-[24px] bg-gray-50"
			style={{
				height: isScreenSmall
					? "calc(100vh - 70px)"
					: "calc(100vh - 42px - 40px)",
			}}
		>
			{children}
		</div>
	);
};

export default Content;
