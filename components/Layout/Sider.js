import { useRouter } from "next/router";
import React from "react";
import { menus } from "../../config/constants";
import CustomImage from "../Shared/CustomImage";

const Sider = () => {
	return (
		<div className="w-[265px] h-[100vh] p-4 sider">
			<CustomImage src="/icons/logo.png" className="mb-12" />

			{/* Menu */}
			<div>
				{menus.map((menu) => (
					<SingleMenu menu={menu} key={menu.name} />
				))}
			</div>
		</div>
	);
};

export default Sider;

export const SingleMenu = ({ menu }) => {
	const router = useRouter();

	const handleNavigation = (url) => {
		router.push(url);
	};

	return (
		<div
			className={`flex align-center gap-12 p-2 my-4 cursor-pointer w-[265px] single_menu ${
				router.pathname === menu.url
					? "rounded-r-full bg-grey text-dark font-medium"
					: "text-gray-500"
			}`}
			onClick={() => handleNavigation(menu.url)}
		>
			<div className="flex-0">
				<CustomImage
					src={`${menu.icon}${router.pathname === menu.url ? "-active" : ""}${
						menu.ext
					}`}
					width={24}
				/>
			</div>

			<p className="flex-1">{menu.name}</p>
		</div>
	);
};
