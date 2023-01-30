export const BASE_DEV_URL = process.env.NEXT_PUBLIC_URL;

export const menus = [
	{
		name: "Classrooms",
		url: "/dashboard",
		icon: "/icons/classes",
		ext: ".svg",
	},

	{
		name: "Students",
		url: "/dashboard/students",
		icon: "/icons/students",
		ext: ".svg",
	},

	{
		name: "Fees",
		url: "/dashboard/fees",
		icon: "/icons/fees",
		ext: ".svg",
	},
];

export const login_options = {
	parent: "PARENT",
	school: "SCHOOL",
	admin: "ADMIN",
	student: "STUDENT",
};

export const _ns_token_ = "_nest_school_logged_in_";

export const _pagination_number_ = 5;
