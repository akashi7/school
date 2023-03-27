import React from "react";
import AnalyticsCard from "../../../components/Shared/AnalyticsCard";

const Analytics = () => {
	const dumpData = [
		{
			id: 1,
			title: "Classrooms",
			value: 3434,
			color: "gray-400",
			icon: "/icons/classes.svg",
		},
		{
			id: 2,
			title: "Students",
			value: 34,
			color: "primary",
			icon: "",
		},
		{
			id: 3,
			title: "Schools",
			value: 878,
			color: "primary",
			icon: "",
		},
		{
			id: 4,
			title: "Parents",
			value: 43,
			color: "primary",
			icon: "",
		},
		{
			id: 5,
			title: "Academic years",
			value: 65,
			color: "primary",
			icon: "",
		},
	];
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-12">
			{dumpData?.map((data) => (
				<AnalyticsCard key={data?.id} data={data} />
			))}
		</div>
	);
};

export default Analytics;
