import React from "react";
import Dropdown from "antd/lib/dropdown";
import CustomImage from "../Shared/CustomImage";
import { useUserProfileQuery } from "../../lib/api/Auth/authEndpoints";
import { isTokenValid } from "../../helpers/verifyToken";
import { logout } from "../../helpers/handleLogout";

const Profile = () => {
	const { error } = useUserProfileQuery();

	const { role } = isTokenValid(error);

	const ProfileDropdown = (
		<div className="w-[100%] rounded shadow-md z-100 bg-white p-2 mt-6">
			<p className="p-4 w-[100%] font-medium">
				User type: <span className="text-gray-400">{role}</span>
			</p>

			<p
				className="w-[100%] rounded p-4 py-2 bg-gray-100 font-[500] pointer hover:p-6 hover:py-3 hover:bg-gray-200"
				onClick={() => logout()}
			>
				Logout
			</p>
		</div>
	);

	return (
		<div className="flex items-center gap-12">
			<CustomImage
				src="/imgs/profile.jpg"
				width={42}
				height={42}
				className="object-cover rounded-full"
			/>

			<Dropdown overlay={ProfileDropdown} trigger={["click"]}>
				<div className="flex items-center gap-12 pointer">
					<p>Issa Jean Marie </p>

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

export default Profile;
