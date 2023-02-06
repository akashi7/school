import React from "react";
import Layout from "../../../components/Layout/index";
import Fees from "./fees";
import Private from "../../../components/Routes/Private";

const Index = () => {
	return (
		<Layout>
			<Fees />
		</Layout>
	);
};

export default Private(Index);
