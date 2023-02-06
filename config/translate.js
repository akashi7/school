/* eslint-disable import/no-anonymous-default-export */
import { _selected_lang_ } from "./constants";
import message from "./message.json";

export default (lang) => {
	const selected_lang = localStorage.getItem(_selected_lang_);

	const options = {
		en: "en_us",
		kinya: "kinya",
	};

	const available_lang = selected_lang || lang;

	return available_lang === options.kinya ? message.kinya : message.en_us;
};
