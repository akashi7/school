import React from "react";
import Layout from "../../../components/Layout/index";
import Private from "../../../components/Routes/Private";
import AcademicYears from "./academic-years";

const Index = () => {
	return (
		<Layout>
			<AcademicYears />
		</Layout>
	);
};

export default Private(Index);
