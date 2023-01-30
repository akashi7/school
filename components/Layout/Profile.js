import React from "react";
import CustomImage from "../Shared/CustomImage";

const Profile = () => {
	return (
		<div className="flex items-center gap-12">
			<CustomImage
				src="/imgs/profile.jpg"
				width={42}
				height={42}
				className="object-cover rounded-full"
			/>

			<p>Issa Jean Marie </p>

			<CustomImage
				src="/icons/expand.svg"
				width={14}
				height={14}
				className="object-cover rounded-full"
			/>
		</div>
	);
};

export default Profile;
