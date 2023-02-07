import React from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import PropTypes from "prop-types";
import { login_options } from "../../config/constants";

const AuthIndex = ({ setActiveLogin }) => {
	const login_cards = [
		{ id: 0, name: "School", activeValue: login_options?.school },
		{ id: 1, name: "Admin", activeValue: login_options?.admin },
		{ id: 2, name: "Parent", activeValue: login_options?.parent },
		{ id: 3, name: "Student", activeValue: login_options?.student },
	];

	return (
		<>
			<p className="font-medium text-dark text-[24px] mt-8 mb-6">
				Continue as:
			</p>

			<Row
				align="middle"
				className="w-[100%] m-auto gap-12 mb-8"
				justify="center"
			>
				{login_cards?.map((card) => (
					<LoginChoiceCard
						key={card.id}
						card={card}
						setActiveLogin={setActiveLogin}
					/>
				))}
			</Row>
		</>
	);
};

AuthIndex.propTypes = {
	setActiveLogin: PropTypes.func,
};

export default AuthIndex;

export const LoginChoiceCard = ({ card, setActiveLogin }) => (
	<Col
		onClick={() => setActiveLogin(card?.activeValue)}
		className="uppercase p-6 px-12 border border-gray-200 bg-gray-100 hover:bg-gray-200 w-[180px] text-center font-medium cursor-pointer"
	>
		{card?.name}
	</Col>
);
