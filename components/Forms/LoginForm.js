import React, { useState } from "react";
import CustomImage from "../Shared/CustomImage";
import AuthIndex from "../Auth/AuthIndex";
import activeForm from "../../helpers/activeForm";
import SchoolLogin from "../Auth/SchoolLogin";

const LoginForm = () => {
	const [activeLogin, setActiveLogin] = useState(null);

	const { school, admin, parent, student } = activeForm(activeLogin);
	return (
		<div className="m-auto bg-white rounded-[12px] p-12  w-[500px] flex flex-col items-center">
			<CustomImage src="/icons/logo.png" width={240} />

			{school ? (
				<SchoolLogin setActiveLogin={setActiveLogin} />
			) : admin ? (
				<p>Admin</p>
			) : parent ? (
				<p>Parent</p>
			) : student ? (
				<p>Student</p>
			) : (
				<AuthIndex setActiveLogin={setActiveLogin} />
			)}
		</div>
	);
};

export default LoginForm;
