import React, { useEffect, useState } from "react";
import Form from "antd/lib/form";
import PropTypes from "prop-types";
import CustomButton from "./Shared/CustomButton";
import CustomInput from "./Shared/CustomInput";
import CustomModal from "./Shared/CustomModal";
import WarningModal from "./Shared/WarningModal";
import {
	useDeleteStreamMutation,
	useEditStreamMutation,
} from "../lib/api/Classrooms/classroomsEndpoints";
import requiredField from "../helpers/requiredField";
import handleAPIRequests from "../helpers/handleAPIRequests";

const SingleStream = ({ data, index, visibleClass }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [isWarningVisible, setIsWarningVisible] = useState(false);

	const [form] = Form.useForm();

	const [editStream, { isLoading: isEditing }] = useEditStreamMutation();
	const [deleteStream, { isLoading: isDeleting }] = useDeleteStreamMutation();

	const onSuccess = () => {
		setIsVisible(false);
	};

	const onEditStreamFinish = (values) => {
		handleAPIRequests({
			request: editStream,
			id: visibleClass?.id,
			streamId: data?.id,
			notify: true,
			...values,
			onSuccess: onSuccess,
		});
	};

	useEffect(() => {
		form.setFieldsValue({
			name: data?.name,
		});
	}, [data?.name, form]);

	const handleDelete = () => {
		setIsWarningVisible(true);
	};

	return (
		<>
			<CustomModal
				isVisible={isVisible}
				setIsVisible={setIsVisible}
				loading={isEditing}
				title="Edit stream"
				footerContent={
					<CustomButton
						loading={isEditing}
						type="primary"
						htmlType="submit"
						form="edit-stream"
					>
						Save
					</CustomButton>
				}
				subTitle="For class"
				subTitleKey={visibleClass?.name}
			>
				<Form form={form} name="edit-stream" onFinish={onEditStreamFinish}>
					<CustomInput
						label="Stream name"
						name="name"
						placeholder="Stream name.."
						rules={requiredField("Stream name")}
					/>
				</Form>
			</CustomModal>

			<WarningModal
				isVisible={isWarningVisible}
				setIsVisible={setIsWarningVisible}
				warningMessage="Do you really want to delete stream"
				warningKey={data?.name}
				itemToDelete={visibleClass?.id}
				request={deleteStream}
				loading={isDeleting}
				streamId={data?.id}
			/>

			<div className="flex bg-white shadow-sm p-4 items-center rounded-sm mb-4">
				<div className="flex gap-12">
					<p className="text-semi_grey">{index}.</p>
					<p className="text-dark">{data.name}</p>
				</div>

				<div className="flex gap-12">
					<CustomButton type="edit" onClick={() => setIsVisible(true)}>
						Edit
					</CustomButton>

					<CustomButton type="delete" onClick={handleDelete}>
						Delete
					</CustomButton>
				</div>
			</div>
		</>
	);
};

SingleStream.propTypes = {
	data: PropTypes.any,
	index: PropTypes.number,
	visibleClass: PropTypes.string,
};

export default SingleStream;
