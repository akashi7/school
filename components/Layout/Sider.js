import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Dropdown from "antd/lib/dropdown";
import {
	available_langs,
	menus,
	_selected_lang_,
} from "../../config/constants";
import translate from "../../config/translate";
import CustomImage from "../Shared/CustomImage";
import { useDispatch, useSelector } from "react-redux";
import { getTranslation } from "../../lib/redux/translationSlice";
import routes from "../../config/routes";
import { useUserProfileQuery } from "../../lib/api/Auth/authEndpoints";
import { isTokenValid } from "../../helpers/verifyToken";

const Sider = () => {
	const local_saved_lang = localStorage.getItem(_selected_lang_);
	const dispatch = useDispatch();

	const globalLanguage = useSelector((state) => state?.translation?.payload);

	const [selectedLang, setSelectedLang] = useState(local_saved_lang || "");
	const trans = translate(selectedLang);

	const handleSelectLanguage = (lng) => {
		localStorage.setItem(_selected_lang_, lng);
		setSelectedLang(lng);
	};

	const { error } = useUserProfileQuery();

	const { role } = isTokenValid(error);

	useEffect(() => {
		dispatch(getTranslation(trans));
	}, [dispatch, trans]);

	const dropdownOptions = (
		<div className="bg-gray-100 p-2">
			{available_langs
				?.filter((lng) => lng?.name !== trans?.name)
				.map((lang) => (
					<div
						key={lang.value}
						onClick={() => handleSelectLanguage(lang.value)}
						className="flex gap-4 bg-white hover:bg-gray-200 mb-1 cursor-pointer p-2 rounded text-sm items-center w-[100%]"
					>
						<span className="text-[18px]">{lang.flag}</span>
						<span className="text-[12px] text-left flex-1 font-medium">
							{lang.name}
						</span>
					</div>
				))}
		</div>
	);

	return (
		<div className="w-[265px] h-[100vh] p-4 flex-col justify-between hidden md:hidden lg:flex">
			<div>
				<CustomImage src="/icons/logo.png" className="mb-12" width={200} />

				{/* Menu */}
				<div>
					{menus({ trans, role }).map((menu) => (
						<SingleMenu menu={menu} key={menu.name} />
					))}
				</div>
			</div>

			<Dropdown overlay={dropdownOptions} trigger={["click"]} placement="top">
				<div className="flex gap-4 bg-gray-200 p-2 rounded text-sm items-center w-[100%] ml-2 cursor-pointer hover:bg-gray-300">
					<span className="text-[18px]">{globalLanguage?.flag}</span>
					<span className="text-[12px] text-left flex-1 font-medium">
						{globalLanguage?.name}
					</span>
					<CustomImage
						src="/icons/expand.svg"
						width={14}
						height={14}
						className="object-cover rounded-full"
					/>
				</div>
			</Dropdown>
		</div>
	);
};

export default Sider;

export const SingleMenu = ({ menu, width }) => {
	const router = useRouter();

	const handleNavigation = (url) => {
		router.push(url);
	};

	const isMenuIndex = menu.url === routes.dashboard.url;

	const isActive = (url) => {
		return (
			(router.pathname === routes.dashboard.url && isMenuIndex) ||
			(router.pathname.includes(url) && !isMenuIndex)
		);
	};

	return (
		<div
			className={`flex text-[16px] align-center gap-4 p-2 my-2 cursor-pointer pr-[24px] lg:pr-2 w-[${
				width || "265px"
			}] single_menu ${
				isActive(menu.url)
					? "rounded-r-full bg-grey text-dark font-[600]"
					: "text-gray-500"
			}`}
			onClick={() => handleNavigation(menu.url)}
		>
			<div className="flex-0">
				<CustomImage
					src={`${menu.icon}${isActive(menu.url) ? "-active" : ""}${menu.ext}`}
					width={24}
				/>
			</div>

			<p className="flex-1">{menu.name}</p>
		</div>
	);
};
