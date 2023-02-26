import React from "react";
import Layout from "../../components/Layout/index";
import Classes from "./classes";
import Private from "../../components/Routes/Private";
import userType from "../../helpers/userType";
import { isTokenValid } from "../../helpers/verifyToken";
import Schools from "./schools";
import Children from "./children/children";
import ActiveStudent from "./active-student";

const Dashboard = () => {
	const { role } = isTokenValid();
	const { isAdmin, isSchool, isParent, isStudent } = userType(role);

	return (
		<Layout>
			{isAdmin ? (
				<Schools />
			) : isParent ? (
				<Children />
			) : isStudent ? (
				<ActiveStudent />
			) : (
				<Classes />
			)}
		</Layout>
	);
};

export default Private(Dashboard);
