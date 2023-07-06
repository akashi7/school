import React from "react";
import Layout from "../../../components/Layout/index";
import Private from "../../../components/Routes/Private";
import Payments from "./p-pay-history";

const Index = () => {
	return (
		<Layout>
			<Payments />
		</Layout>
	);
};

export default Private(Index);