import React, { useState } from "react";
import CustomImage from "../../../components/Shared/CustomImage";
import SingleStream from "../../../components/SingleStream";
import CustomButton from "../../../components/Shared/CustomButton";
import CustomInput from "../../../components/Shared/CustomInput";
import CustomModal from "../../../components/Shared/CustomModal";

const dumpData = [
	{
		id: 0,
		name: "P1 A",
	},

	{
		id: 1,
		name: "P1 B",
	},

	{
		id: 2,
		name: "P1 F",
	},
];

const ClassProfile = () => {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<>
			<CustomModal
				isVisible={isVisible}
				setIsVisible={setIsVisible}
				title="Add stream"
				footerContent={<CustomButton type="primary">Save</CustomButton>}
				subTitle="For class"
				subTitleKey="S3"
			>
				<CustomInput label="Stream name" placeholder="Stream name.." />
			</CustomModal>

			<div className="w-[100%] bg-white p-8 rounded-md">
				<h1 className="text-dark font-semibold mb-12 border-b pb-6 text-[32px]">
					Kindergarten
				</h1>

				<div className="flex justify-between items-center bg-grey p-4 rounded-md mb-12">
					<p className="text-[20px] text-dark font-semibold">24 Streams</p>

					<CustomImage
						onClick={() => setIsVisible(true)}
						src="/icons/add_stream.svg"
						className="cursor-pointer"
					/>
				</div>

				{dumpData.map((data) => (
					<SingleStream key={data.id} data={data} />
				))}
			</div>
		</>
	);
};

export default ClassProfile;
