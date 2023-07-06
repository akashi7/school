import React from "react";
import Layout from "../../../components/Layout/index";
import Private from "../../../components/Routes/Private";
import DeductibleTypes from './deductible-types';

const Index = () => {
	return (
		<Layout>
			<DeductibleTypes />
		</Layout>
	);
};

export default Private(Index);