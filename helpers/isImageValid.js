export const isImageValid = (files) =>
	files[0]?.type === "image/png" ||
	files[0]?.type === "image/jpg" ||
	files[0]?.type === "image/jpeg" ||
	files[0]?.type === "image/svg+xml";
