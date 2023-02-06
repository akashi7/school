import React from "react";
import Layout from "../../components/Layout/index";
import Classes from "./classes";
import Private from "../../components/Routes/Private";

const Dashboard = () => {
	return (
		<Layout>
			<Classes />
		</Layout>
	);
};

export default Private(Dashboard);
