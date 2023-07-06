import React from "react";
import Layout from "../../../components/Layout/index";
import Private from "../../../components/Routes/Private";
import Installments from './installments';

const Index = () => {
	return (
		<Layout>
			<Installments />
		</Layout>
	);
};

export default Private(Index);