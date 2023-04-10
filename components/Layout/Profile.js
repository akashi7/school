import React, { useState, useEffect } from "react";
import Dropdown from "antd/lib/dropdown";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import CustomImage from "../Shared/CustomImage";
import { useUserProfileQuery } from "../../lib/api/Auth/authEndpoints";
import { isTokenValid } from "../../helpers/verifyToken";
import { logout } from "../../helpers/handleLogout";
import { useDispatch, useSelector } from "react-redux";
import { SingleMenu } from "./Sider";
import { menus, _selected_lang_ } from "../../config/constants";
import translate from "../../config/translate";
import { getTranslation } from "../../lib/redux/translationSlice";
import { useWindowSize } from "../../helpers/useWindowSize";
import userType from "../../helpers/userType";

const Profile = () => {
	const local_saved_lang = localStorage.getItem(_selected_lang_);
	const dispatch = useDispatch();

	const lang = useSelector((state) => state?.translation?.payload);

	const [selectedLang, setSelectedLang] = useState(local_saved_lang || "");
	const trans = translate(selectedLang);

	const handleSelectLanguage = (lng) => {
		localStorage.setItem(_selected_lang_, lng);
		setSelectedLang(lng);
	};

	const { error, data } = useUserProfileQuery();

	const { role } = isTokenValid(error);

	useEffect(() => {
		dispatch(getTranslation(trans));
	}, [dispatch, trans]);

	const { width } = useWindowSize();
	const isScreenSmall = width <= 1024;

	const ProfileDropdown = (
		<div className="w-[100%] rounded shadow-md z-100 bg-white p-2 mt-6">
			<p className="p-4 px-2 w-[100%] font-medium">
				{lang?.dashboard_shared?.profile?.user_type}{" "}
				<span className="text-gray-400">{role}</span>
			</p>

			<div
				onClick={() => logout()}
				className="flex items-center gap-2 w-[100%] rounded p-2 bg-gray-100 font-[600] cursor-pointer hover:p-4 hover:py-3 hover:bg-gray-200"
			>
				<CustomImage src="/icons/logout.svg" width={20} />

				<p className="flex-1">{lang?.dashboard_shared?.profile?.logout}</p>
			</div>
		</div>
	);

	const MenuDropdown = (
		<div className="w-[fit-content] rounded shadow-md z-100 bg-white p-2 mt-6">
			{menus({ trans, role }).map((menu) => (
				<SingleMenu width="fit-content" menu={menu} key={menu.name} />
			))}
		</div>
	);

	return (
		<Row align="middle" gutter={18}>
			{isScreenSmall && (
				<Col className="flex items-centers">
					<Dropdown overlay={MenuDropdown} trigger={["click"]}>
						<CustomImage
							src="/icons/mobile_menu_open.svg"
							width={24}
							className="pointer"
						/>
					</Dropdown>
				</Col>
			)}

			<Col>
				<Dropdown overlay={ProfileDropdown} trigger={["click"]}>
					<div className="flex items-center gap-2 lg:gap-4 cursor-pointer hover:bg-gray-200 lg:hover:bg-none p-1 px-2 rounded">
						<CustomImage
							src={data?.payload?.passportPhoto || ""}
							className="object-cover rounded-full w-[30px] h-[30px] lg:w-[38px] lg:h-[38px]"
						/>

						<div className="flex items-center gap-2">
							<p className="hidden lg:block">
								{userType(role)?.isParent
									? `${data?.payload?.fullName?.split(" ")[0]}'s parent`
									: data?.payload?.fullName}
							</p>

							<CustomImage
								src="/icons/expand.svg"
								width={14}
								height={14}
								className="object-cover rounded-full"
							/>
						</div>
					</div>
				</Dropdown>
			</Col>
		</Row>
	);
};

export default Profile;
