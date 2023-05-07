import React from "react";
import AnalyticsHeader from "../../../components/Analytics/AnalyticsHeader";
import AnalyticsTable from "../../../components/Analytics/AnalyticsTable";

const Analytics = () => {
	return (
		<div className="overflow-y-auto" style={{ height: "calc(100vh - 120px)" }}>
			<AnalyticsHeader />
			<AnalyticsTable />
		</div>
	);
};

export default Analytics;
