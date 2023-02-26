import React, { useState, useEffect } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Dropdown from "antd/lib/dropdown";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import CustomImage from "../Shared/CustomImage";
import translate from "../../config/translate";
import {
	available_langs,
	login_options,
	_selected_lang_,
} from "../../config/constants";
import { getTranslation } from "../../lib/redux/translationSlice";

const AuthIndex = ({ setActiveLogin }) => {
	const local_saved_lang = localStorage.getItem(_selected_lang_);
	const dispatch = useDispatch();

	const globalLanguage = useSelector((state) => state?.translation?.payload);

	const [selectedLang, setSelectedLang] = useState(local_saved_lang || "");
	const trans = translate(selectedLang);

	const handleSelectLanguage = (lng) => {
		localStorage.setItem(_selected_lang_, lng);
		setSelectedLang(lng);
	};

	useEffect(() => {
		dispatch(getTranslation(trans));
	}, [dispatch, trans]);

	const login_cards = [
		{
			id: 0,
			name: globalLanguage?.auth?.school,
			activeValue: login_options?.school,
		},
		{
			id: 1,
			name: globalLanguage?.auth?.admin,
			activeValue: login_options?.admin,
		},
		{
			id: 2,
			name: globalLanguage?.auth?.parent,
			activeValue: login_options?.parent,
		},
		{
			id: 3,
			name: globalLanguage?.auth?.student,
			activeValue: login_options?.student,
		},
	];

	const dropdownOptions = (
		<div className="bg-gray-100 p-2">
			{available_langs
				?.filter((lng) => lng?.name !== trans?.name)
				.map((lang) => (
					<div
						key={lang.value}
						onClick={() => handleSelectLanguage(lang.value)}
						className="flex gap-12 bg-white hover:bg-gray-200 mb-1 cursor-pointer p-2 rounded text-sm items-center w-[100%]"
					>
						<span className="text-[18px]">{lang.flag}</span>
						<span className="text-[12px] text-left flex-1 font-medium">
							{lang.name}
						</span>
					</div>
				))}
		</div>
	);

	return (
		<>
			<p className="font-medium text-dark text-[24px] mt-8 mb-6">
				{globalLanguage?.auth?.title}:
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

			<div className="w-[100%] grid justify-end px-4">
				<Dropdown overlay={dropdownOptions} trigger={["click"]} placement="top">
					<div className="flex gap-12 bg-gray-200 p-2 rounded text-sm items-center w-[100%] ml-2 cursor-pointer hover:bg-gray-300">
						<span className="text-[18px]">{globalLanguage?.flag}</span>
						<span className="text-[12px] text-left flex-1 font-medium">
							{globalLanguage?.name}
						</span>
						<CustomImage
							src="/icons/expand.svg"
							width={14}
							height={14}
							className="object-cover rounded-full"
						/>
					</div>
				</Dropdown>
			</div>
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
		className="uppercase p-6 px-4 border border-gray-200 bg-gray-100 hover:bg-gray-200 w-[180px] text-center font-medium cursor-pointer"
	>
		{card?.name}
	</Col>
);
