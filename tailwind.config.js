/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#EB6024",
				primary_hover: "#d6531a",
				dark: "#30445C",
				edit_blue: "#00B0AF",
				delete_red: "#EB6024",
				red: "#FF0000",
				grey: "#F8F8F8",
				semi_grey: "#757575",
				edit_bg: "rgba(0, 176, 175, 0.1)",
			},
		},
	},
	plugins: [],
};
