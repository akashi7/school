/* eslint-disable import/no-anonymous-default-export */
export default (role) => ({
	isAdmin: role === "ADMIN",
	isSchool: role === "SCHOOL",
	isStudent: role === "STUDENT",
	isParent: role === "PARENT",
});
