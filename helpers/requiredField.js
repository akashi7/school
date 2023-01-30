const requiredField = (message) => [
	{ required: true, message: `${message} is required` },
];

export default requiredField;
