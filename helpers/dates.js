export const yearsGenerator = () => {
	const date = new Date();
	const currentYear = date.getFullYear();

	const years = [];

	for (let i = currentYear; i >= 1900; i--) {
		years.push({ value: i.toString(), label: i });
	}

	return years;
};
