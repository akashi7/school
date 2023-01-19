import React, { useState } from "react";
import ContentNavbar from "../../../components/Shared/ContentNavbar";
import CustomButton from "../../../components/Shared/CustomButton";
import ClassProfile from "./ClassProfile";
import SingleClass from "../../../components/SingleClass";
import CustomModal from "../../../components/Shared/CustomModal";
import CustomInput from "../../../components/Shared/CustomInput";

const Classes = () => {
	const [isVisible, setIsVisible] = useState(false);

	const RightSide = () => (
		<CustomButton onClick={() => setIsVisible(true)} type="primary">
			New class
		</CustomButton>
	);

	const LeftSide = () => (
		<p className="text-[20px] text-dark font-semibold">24 Classrooms</p>
	);

	const dumpData = [
		{
			id: 0,
			name: "Kindergarten",
		},
		{
			id: 1,
			name: "Senior 1",
		},
		,
		{
			id: 2,
			name: "Primary 1",
		},
	];

	return (
		<div>
			<CustomModal
				isVisible={isVisible}
				setIsVisible={setIsVisible}
				title="Create class"
				footerContent={<CustomButton type="primary">Save</CustomButton>}
			>
				<CustomInput label="Class name" placeholder="Class name..." />
			</CustomModal>

			<ContentNavbar left={<LeftSide />} right={<RightSide />} />

			{/* Content */}
			<div className="flex gap-4 mt-12 h-[73vh] overflow-y-auto">
				<div className="w-[55%] mr-12">
					{dumpData.map((data) => (
						<SingleClass data={data} key={data.id} />
					))}
				</div>

				<div className="w-[45%]">
					<ClassProfile />
				</div>
			</div>
		</div>
	);
};

export default Classes;
