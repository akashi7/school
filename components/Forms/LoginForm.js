import React, { useState } from "react";
import CustomImage from "../Shared/CustomImage";
import AuthIndex from "../Auth/AuthIndex";
import activeForm from "../../helpers/activeForm";
import SchoolLogin from "../Auth/SchoolLogin";
import AdminLogin from "../Auth/AdminLogin";
import StudentLogin from "../Auth/StudentLogin";
import ParentLogin from "../Auth/ParentLogin";
import { useSelector } from "react-redux";

const LoginForm = () => {
	const [activeLogin, setActiveLogin] = useState(null);

	const { school, admin, parent, student } = activeForm(activeLogin);

	const lang = useSelector((state) => state?.translation?.payload);

	return (
		<div className="m-auto bg-white rounded-[12px] p-12  w-full md:w-[500px] flex flex-col items-center">
			<CustomImage src="/icons/logo.png" width={240} />

			{school ? (
				<SchoolLogin lang={lang} setActiveLogin={setActiveLogin} />
			) : admin ? (
				<AdminLogin lang={lang} setActiveLogin={setActiveLogin} />
			) : parent ? (
				<ParentLogin lang={lang} setActiveLogin={setActiveLogin} />
			) : student ? (
				<StudentLogin lang={lang} setActiveLogin={setActiveLogin} />
			) : (
				<AuthIndex setActiveLogin={setActiveLogin} />
			)}
		</div>
	);
};

export default LoginForm;
