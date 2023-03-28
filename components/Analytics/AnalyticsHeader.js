import React from "react";
import Button from "antd/lib/button";
import CustomImage from "../../components/Shared/CustomImage";
import { toLocalString } from "../../helpers/numbers";

const AnalyticsHeader = () => {
	return (
		<div className="gap-4 lg:gap-6 xl:gap-8 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 xl:grid-cols-3">
			<div
				className="col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-2 p-10 rounded flex flex-col md:flex-row items-center justify-between"
				style={{
					background:
						"linear-gradient(0deg, rgba(51, 73, 97, 0.79), rgba(51, 73, 97, 0.9)), url(/imgs/students.jpg)",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<div>
					<h1 className="text-[52px] text-center md:text-left font-bold text-white">
						{toLocalString(7865)}
					</h1>
					<p className="text-white text-center md:text-left">Students</p>
				</div>

				<Button
					style={{ background: "rgba(0,0,0,0.3)" }}
					className="text-white h-[42px] px-6 border-none hover:text-gray-400 rounded mt-6 md:mt-0"
				>
					Explore
				</Button>
			</div>

			<div
				className="col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-1 p-10 rounded items-start flex gap-4"
				style={{
					background:
						"linear-gradient(0deg, rgba(11, 11, 11, 1), rgba(51, 73, 97, 1))",
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			>
				<div className="rounded-full border-primary border-2 w-[60px] h-[60px] flex items-center justify-center mt-2">
					<CustomImage src="/icons/children-active.svg" className="w-[40px]" />
				</div>

				<div>
					<h1 className="text-[52px] font-bold text-white">
						{toLocalString(7865)}
					</h1>
					<p className="text-white">Parents</p>
				</div>
			</div>
		</div>
	);
};

export default AnalyticsHeader;
