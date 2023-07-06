import React from "react";
import Layout from "../../../components/Layout/index";
import Private from "../../../components/Routes/Private";
import Deductibles from './deductibles';

const Index = () => {
	return (
		<Layout>
			<Deductibles />
		</Layout>
	);
};

export default Private(Index);