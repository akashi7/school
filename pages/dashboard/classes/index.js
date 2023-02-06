import React, { useState, useEffect } from "react";
import Form from "antd/lib/form";
import ContentNavbar from "../../../components/Shared/ContentNavbar";
import CustomButton from "../../../components/Shared/CustomButton";
import ClassProfile from "./ClassProfile";
import CustomModal from "../../../components/Shared/CustomModal";
import CustomInput from "../../../components/Shared/CustomInput";
import Private from "../../../components/Routes/Private";
import {
	useAddClassMutation,
	useGetClassesQuery,
	useEditClassMutation,
} from "../../../lib/api/Classrooms/classroomsEndpoints";
import {
	AppLoader,
	GeneralContentLoader,
} from "../../../components/Shared/Loaders";
import requiredField from "../../../helpers/requiredField";
import handleAPIRequests from "../../../helpers/handleAPIRequests";
import Paginator from "../../../components/Shared/Paginator";
import { _pagination_number_ } from "../../../config/constants";
import ClassesTable from "../../../components/Tables/ClassesTable";

const Classes = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [visibleClass, setVisibleClass] = useState(null);
	const [currentPage, setCurrentPage] = useState(0);
	const [search, setSearch] = useState("");
	const [itemToEdit, setItemToEdit] = useState(null);

	const {
		data: classes,
		isLoading,
		isFetching,
	} = useGetClassesQuery({
		page: currentPage,
		size: _pagination_number_,
		search,
	});

	const [addClass, { isLoading: isAddingClass }] = useAddClassMutation();
	const [editClass, { isLoading: isEditing }] = useEditClassMutation();

	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue({ name: itemToEdit?.name });
	}, [form, itemToEdit?.name]);

	const onSuccess = () => {
		setIsVisible(false);
		setCurrentPage(0);
		setSearch("");
		form.resetFields();
	};

	const onEditSuccess = (res) => {
		setVisibleClass({
			...visibleClass,
			name: res?.payload?.name || visibleClass?.name,
		});

		setIsVisible(false);
		setItemToEdit(null);
	};

	const onAddClassFinish = (values) => {
		handleAPIRequests({
			request: itemToEdit ? editClass : addClass,
			onSuccess: itemToEdit ? onEditSuccess : onSuccess,
			id: itemToEdit?.id,
			notify: true,
			...values,
		});
	};

	const handleCancelEditModal = () => {
		setIsVisible(false);
		setItemToEdit(null);
	};

	const onSearchChange = (value) => {
		setSearch(value);
		setCurrentPage(0);
	};

	const RightSide = () => (
		<CustomButton onClick={() => setIsVisible(true)} type="primary">
			New class
		</CustomButton>
	);

	const LeftSide = () => (
		<p className="text-[20px] text-dark font-semibold">
			{classes?.payload?.items?.length || ""} Classrooms
		</p>
	);

	return (
		<div>
			<CustomModal
				isVisible={isVisible}
				setIsVisible={setIsVisible}
				loading={isAddingClass || isEditing}
				handleCancel={handleCancelEditModal}
				title={itemToEdit ? "Edit class" : "Add a class"}
				subTitle={itemToEdit?.name || ""}
				footerContent={
					<CustomButton
						loading={isAddingClass || isEditing}
						type="primary"
						htmlType="submit"
						form="add-class"
					>
						Save
					</CustomButton>
				}
			>
				<Form form={form} name="add-class" onFinish={onAddClassFinish}>
					<CustomInput
						label="Class name"
						placeholder="Class name..."
						name="name"
						rules={requiredField("Class name")}
					/>
				</Form>
			</CustomModal>

			<ContentNavbar left={<LeftSide />} right={<RightSide />} />

			{/* Content */}
			{isLoading ? (
				<GeneralContentLoader />
			) : (
				<div className="flex gap-4 mt-8 h-[73vh] overflow-y-hidden">
					<div className={`w-[55%] h-[73vh] overflow-y-auto mr-12`}>
						<div className="w-[350px] mb-8">
							<CustomInput
								onChange={onSearchChange}
								placeholder="type to search..."
							/>
						</div>
						{isLoading ? (
							<AppLoader className="h-[60vh]" />
						) : (
							<ClassesTable
								classes={classes?.payload?.items}
								visibleClass={visibleClass}
								setVisibleClass={setVisibleClass}
								setIsVisible={setIsVisible}
								setSearch={setSearch}
								setCurrentPage={setCurrentPage}
								isFetching={isFetching}
								setItemToEdit={setItemToEdit}
							/>
						)}

						<Paginator
							total={classes?.payload?.totalItems}
							setCurrentPage={setCurrentPage}
							totalPages={classes?.payload?.totalPages}
						/>
					</div>

					<div className="w-[45%]">
						<ClassProfile visibleClass={visibleClass} />
					</div>
				</div>
			)}
		</div>
	);
};

export default Private(Classes);
