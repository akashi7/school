import React from "react";
import Layout from "../../../components/Layout/index";
import Private from "../../../components/Routes/Private";
import Students from "./students";

const index = () => {
	return (
		<Layout>
			<Students />
		</Layout>
	);
};

export default Private(index);
