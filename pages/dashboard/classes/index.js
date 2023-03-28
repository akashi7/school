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
import { useSelector } from "react-redux";
import { useWindowSize } from "../../../helpers/useWindowSize";
import Layout from "../../../components/Layout";

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

	const lang = useSelector((state) => state?.translation?.payload);

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
			message: itemToEdit
				? lang?.alert_messages?.success?.edit_classroom
				: lang?.alert_messages?.success?.create_classroom,
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

	const { width } = useWindowSize();
	const showClassProfile = width >= 1024;
	const showMoreIcons = width <= 660;

	const RightSide = () => (
		<CustomButton onClick={() => setIsVisible(true)} type="primary">
			{lang?.classrooms_pg?.new_btn}
		</CustomButton>
	);

	const LeftSide = () => (
		<p className="text-[20px] text-dark font-semibold">
			{classes?.payload?.totalItems || ""} {lang?.classrooms_pg?.title}
		</p>
	);

	return (
		<Layout>
			<CustomModal
				isVisible={isVisible}
				setIsVisible={setIsVisible}
				loading={isAddingClass || isEditing}
				handleCancel={handleCancelEditModal}
				title={
					itemToEdit
						? lang?.classrooms_pg?.modals?.edit_class_title
						: lang?.classrooms_pg?.modals?.add_class_title
				}
				subTitle={itemToEdit?.name || ""}
				footerContent={
					<CustomButton
						loading={isAddingClass || isEditing}
						type="primary"
						htmlType="submit"
						form="add-class"
					>
						{lang?.dashboard_shared?.buttons?.save}
					</CustomButton>
				}
			>
				<Form form={form} name="add-class" onFinish={onAddClassFinish}>
					<CustomInput
						label={lang?.classrooms_pg?.modals?.class_name}
						placeholder={`${lang?.classrooms_pg?.modals?.class_name}...`}
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
				<div className="flex mt-8 h-[fit-content] overflow-y-hidden">
					<div
						style={{ maxHeight: "calc(100vh - 180px)" }}
						className={`${
							showClassProfile ? "w-[55%]" : "w-[100%]"
						} h-[fit-content] ${
							showClassProfile ? "mr-12" : "mr-0"
						} border-none lg:border p-0 lg:p-4 rounded`}
					>
						<div className="w-full md:w-[50%] lg:w-[350px] mb-8">
							<CustomInput
								onChange={onSearchChange}
								placeholder={lang?.dashboard_shared?.messages?.type_to_search}
							/>
						</div>
						{isLoading ? (
							<AppLoader className="h-[60vh]" />
						) : (
							<div
								style={{ maxHeight: "calc(100vh - 280px)" }}
								className="h-[fit-content] overflow-y-auto"
							>
								<ClassesTable
									classes={classes?.payload?.items}
									visibleClass={visibleClass}
									setVisibleClass={setVisibleClass}
									setIsVisible={setIsVisible}
									setSearch={setSearch}
									setCurrentPage={setCurrentPage}
									isFetching={isFetching}
									setItemToEdit={setItemToEdit}
									lang={lang}
									showMoreIcons={showMoreIcons}
								/>
							</div>
						)}

						<Paginator
							total={classes?.payload?.totalItems}
							setCurrentPage={setCurrentPage}
							totalPages={classes?.payload?.totalPages}
						/>
					</div>

					<div
						className={`${
							showClassProfile
								? "w-[45%] relative"
								: !showClassProfile && visibleClass
								? "w-[100%] absolute right-0"
								: "w-[0] relative"
						}`}
					>
						{(showClassProfile || (!showClassProfile && visibleClass)) && (
							<ClassProfile
								lang={lang}
								visibleClass={visibleClass}
								setVisibleClass={setVisibleClass}
								showClassProfile={showClassProfile}
							/>
						)}
					</div>
				</div>
			)}
		</Layout>
	);
};

export default Private(Classes);
