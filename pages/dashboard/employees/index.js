import React from "react";
import Layout from "../../../components/Layout/index";
import Private from "../../../components/Routes/Private";
import Employees from './employees';

const Index = () => {
	return (
		<Layout>
			<Employees />
		</Layout>
	);
};

export default Private(Index);