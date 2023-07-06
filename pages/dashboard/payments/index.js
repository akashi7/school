import React from "react";
import Layout from "../../../components/Layout/index";
import Payments from "./payments";
import Private from "../../../components/Routes/Private";

const Index = () => {
	return (
		<Layout>
			<Payments />
		</Layout>
	);
};

export default Private(Index);