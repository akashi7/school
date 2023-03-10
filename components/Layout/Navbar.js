import React from "react";
import CustomImage from "../Shared/CustomImage";
import Profile from "./Profile";

const Navbar = () => {
	return (
		<div className="flex items center justify-between lg:justify-end w-[100%] p-4">
			<CustomImage
				src="/icons/logo.png"
				className="block lg:hidden"
				width={120}
			/>

			<Profile />
		</div>
	);
};

export default Navbar;
