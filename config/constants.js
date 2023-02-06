export const BASE_DEV_URL = process.env.NEXT_PUBLIC_URL;

export const menus = (trans) => {
	return [
		{
			name: trans?.navbar?.classroom,
			url: "/dashboard",
			icon: "/icons/classes",
			ext: ".svg",
		},

		{
			name: trans?.navbar?.students,
			url: "/dashboard/students",
			icon: "/icons/students",
			ext: ".svg",
		},

		{
			name: trans?.navbar?.fees,
			url: "/dashboard/fees",
			icon: "/icons/fees",
			ext: ".svg",
		},
	];
};

export const login_options = {
	parent: "PARENT",
	school: "SCHOOL",
	admin: "ADMIN",
	student: "STUDENT",
};

export const _ns_token_ = "_nest_school_logged_in_";
export const _pagination_number_ = 2;
export const _selected_lang_ = "_selected_lang_";

export const termOptions = [
	{ key: 1, value: "TERM1", label: "Term I" },
	{ key: 2, value: "TERM2", label: "Term II" },
	{ key: 3, value: "TERM3", label: "Term III" },
];

export const available_langs = [
	{ name: "English", value: "en_us", flag: "🇺🇸" },
	{ name: "Kinyarwanda", value: "kinya", flag: "🇷🇼" },
];
