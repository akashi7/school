import moment from "moment";
import { useEffect } from "react";

const useHandleNewStudentForm = ({ form, itemToEdit }) => {
	const dob = itemToEdit?.dob;

	useEffect(() => {
		form.setFieldsValue({
			academicYearId: itemToEdit?.academicYearId || "",
			fullName: itemToEdit?.fullName || "",
			gender: itemToEdit?.gender || "",
			dob: dob ? moment(dob) : "",
			email: itemToEdit?.email || "",
			address: itemToEdit?.address || "",
			countryName: itemToEdit?.countryName || "",
			parentPhoneNumber: itemToEdit?.parent?.phone || "",
			firstContactPhone: itemToEdit?.firstContactPhone || "",
			secondContactPhone: itemToEdit?.secondContactPhone || "",
			academicTerm: itemToEdit?.academicTerm || "",
			classroomId: itemToEdit?.stream?.classroom?.id || "",
			streamId: itemToEdit?.streamId || "",
		});
	}, [dob, form, itemToEdit]);

	return null;
};

export default useHandleNewStudentForm;
