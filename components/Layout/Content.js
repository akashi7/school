import React from "react";

const Content = ({ children }) => {
	return (
		<div
			className="h-[92vh]  bg-grey rounded-tl-[32px] p-[24px]"
			style={{ height: "calc(100vh - 42px - 40px)" }}
		>
			{children}
		</div>
	);
};

export default Content;
