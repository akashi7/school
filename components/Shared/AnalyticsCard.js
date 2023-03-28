import React from "react";
import CustomImage from "./CustomImage";
import { toLocalString } from "../../helpers/numbers";

const AnalyticsCard = ({ data }) => {
	return (
		<div className="bg-white p-8 rounded-lg shadow-md w-full">
			<div className="flex items-top gap-4">
				<div className="w-[100px] h-[100px]">
					<CustomImage
						src={data?.icon || "/icons/dashboard.svg"}
						className="object-cover rounded-full w-[100px] h-[100px]"
					/>
				</div>

				<div>
					<h1
						className={`text-[42px] font-bold text-${data?.color || "primary"}`}
					>
						{toLocalString(data?.value || 0)}
					</h1>
					<span className="text-gray-500">{data?.title}</span>
				</div>
			</div>
		</div>
	);
};

export default AnalyticsCard;
