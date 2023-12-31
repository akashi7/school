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
import { useWindowSize } from "../../helpers/useWindowSize";

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
		{
			id: 4,
			name: globalLanguage?.auth?.employee,
			activeValue: login_options?.employee,
		}
	];

	const dropdownOptions = (
		<div className="bg-gray-100 p-2">
			{available_langs
				?.filter((lng) => lng?.name !== trans?.name)
				.map((lang) => (
					<div
						key={lang.value}
						onClick={() => handleSelectLanguage(lang.value)}
						className="flex gap-4 bg-white hover:bg-gray-200 mb-1 cursor-pointer p-2 rounded text-sm items-center w-[100%]"
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
			<p className="font-medium text-dark text-[24px] my-12">
				{globalLanguage?.auth?.title}:
			</p>

			<Row
				align="middle"
				className="w-[100%] m-auto gap-6 mb-12"
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
					<div className="flex gap-4 bg-gray-200 p-2 rounded text-sm items-center w-[100%] ml-2 cursor-pointer hover:bg-gray-300">
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

export const LoginChoiceCard = ({ card, setActiveLogin }) => {
	const { width } = useWindowSize();
	const isScreenSmall = width < 500;

	return isScreenSmall ? (
		<p
			className="text-sm bg-slate-200 hover:bg-slate-300 p-2 rounded w-[100px] text-center"
			onClick={() => setActiveLogin(card?.activeValue)}
		>
			{card?.name}
		</p>
	) : (
		<Col
			onClick={() => setActiveLogin(card?.activeValue)}
			className="uppercase p-4 px-2 rounded border text-[18px] border-gray-200 bg-gray-100 hover:bg-gray-200 w-[180px] text-center font-[400] text-gray-600 cursor-pointer"
		>
			{card?.name}
		</Col>
	);
};
