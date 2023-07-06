import moment from "moment";
import { useEffect } from "react";

const useHandleNewEmployeeForm = ({ form, itemToEdit }) => {
	const dob = itemToEdit?.employeeDob;

	useEffect(() => {
		form.setFieldsValue({
			employeeFullName: itemToEdit?.employeeFullName || "",
			employeeGender: itemToEdit?.employeeGender || "",
			employeeDob: dob ? moment(dob) : "",
			employeeEmail: itemToEdit?.employeeEmail || "",
			address: itemToEdit?.address || "",
			employeeCountryName: itemToEdit?.countryName || "",
			employeeContactPhone: itemToEdit?.employeeContactPhone || "",
			employeeIdentifier: itemToEdit?.employeeIdentifier || "",
			AccountNumber: itemToEdit?.AccountNumber || "",
      position:itemToEdit?.position || "",

		});
	}, [dob, form, itemToEdit]);

	return null;
};

export default useHandleNewEmployeeForm;
