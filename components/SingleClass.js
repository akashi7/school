import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Form from "antd/lib/form";
import CustomButton from "./Shared/CustomButton";
import CustomModal from "./Shared/CustomModal";
import CustomInput from "./Shared/CustomInput";
import WarningModal from "./Shared/WarningModal";
import {
	useDeleteClassMutation,
	useEditClassMutation,
} from "../lib/api/Classrooms/classroomsEndpoints";
import handleAPIRequests from "../helpers/handleAPIRequests";
import requiredField from "../helpers/requiredField";

const SingleClass = ({
	data,
	index,
	visibleClass,
	setVisibleClass,
	setSearch,
	setCurrentPage,
}) => {
	const [isVisible, setIsVisible] = useState(false);
	const [isWarningVisible, setIsWarningVisible] = useState(false);

	const [form] = Form.useForm();

	const [deleteClass, { isLoading: isDeleting }] = useDeleteClassMutation();
	const [editClass, { isLoading: isEditing }] = useEditClassMutation();

	useEffect(() => {
		if (data) {
			form.setFieldsValue({ name: data.name });
		}
	}, [data, form]);

	const onSuccess = () => {
		setIsVisible(false);
		setVisibleClass(null);
		setSearch("");
		setCurrentPage(0);
		form.resetFields();
	};

	const onEditStudentFinish = (values) => {
		handleAPIRequests({
			request: editClass,
			notify: true,
			id: data?.id,
			onSuccess: onSuccess,
			...values,
		});
	};

	const handleDelete = (id) => {
		setIsWarningVisible(true);
	};

	const onDeleteClassSuccess = () => {
		setVisibleClass(null);
		setIsVisible(false);
	};

	return (
		<>
			<CustomModal
				isVisible={isVisible}
				setIsVisible={setIsVisible}
				loading={isEditing}
				title="Edit class"
				footerContent={
					<CustomButton
						type="primary"
						htmlType="submit"
						form="edit-class"
						loading={isEditing}
					>
						Save
					</CustomButton>
				}
			>
				<Form form={form} name="edit-class" onFinish={onEditStudentFinish}>
					<CustomInput
						label="Class name"
						placeholder="Class name..."
						name="name"
						rules={requiredField("Class name")}
					/>
				</Form>
			</CustomModal>

			<WarningModal
				isVisible={isWarningVisible}
				setIsVisible={setIsWarningVisible}
				warningMessage="Do you really want to delete class"
				warningKey={data?.name}
				itemToDelete={data?.id}
				request={deleteClass}
				loading={isDeleting}
				onSuccess={onDeleteClassSuccess}
			/>

			<div className="flex bg-white shadow-sm p-4 items-center rounded-sm mb-4">
				<div className="flex gap-12">
					<p className="text-semi_grey">{index}.</p>
					<p className="text-dark">{data?.name}</p>
				</div>

				<div className="flex gap-12">
					<CustomButton
						type="view"
						onClick={() => setVisibleClass(data)}
						disabled={data?.id === visibleClass?.id}
					>
						View
					</CustomButton>

					<CustomButton type="edit" onClick={() => setIsVisible(true)}>
						Edit
					</CustomButton>

					<CustomButton type="delete" onClick={() => handleDelete(data?.id)}>
						Delete
					</CustomButton>
				</div>
			</div>
		</>
	);
};

SingleClass.propTypes = {
	data: PropTypes.object,
	index: PropTypes.number,
	visibleClass: PropTypes.any,
	setVisibleClass: PropTypes.func,
};

export default SingleClass;
