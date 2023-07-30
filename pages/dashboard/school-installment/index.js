import React from "react";
import Layout from "../../../components/Layout/index";
import Private from "../../../components/Routes/Private";
import SchoolInstallments from './s-installment';

const Index = () => {
	return (
		<Layout>
			<SchoolInstallments />
		</Layout>
	);
};

export default Private(Index);