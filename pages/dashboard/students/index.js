import React from "react";
import Layout from "../../../components/Layout/index";
import Private from "../../../components/Routes/Private";
import Students from "./students";

const Index = () => {
	return (
		<Layout>
			<Students />
		</Layout>
	);
};

export default Private(Index);
