import React from "react";
import CustomImage from "./CustomImage";

const SmallScreen = () => {
	return (
		<div className="w-[100%] h-[100vh] grid items-center justify-center">
			<div className="flex flex-rows items-center">
				<CustomImage src="icons/small.svg" width={120} />
				<p className="w-[70%] md:w-[60%] lg:w-[50%] text-[14px] text-center text-gray-500">
					This screen is too small to display the dashboard!
				</p>
			</div>
		</div>
	);
};

export default SmallScreen;
