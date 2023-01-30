export const getFromLocal = (name) => {
	const value = localStorage.getItem(name);

	return value;
};

export const setToLocal = (name, value) => {
	localStorage.setItem(name, value);
};
