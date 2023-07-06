import React from "react";
import Layout from "../../../components/Layout/index";
import Private from "../../../components/Routes/Private";
import Positions from "./positions";

const Index = () => {
	return (
		<Layout>
			<Positions />
		</Layout>
	);
};

export default Private(Index);