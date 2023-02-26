import React, { useEffect, useState } from "react";
import Form from "antd/lib/form";
import ContentNavbar from "../../../components/Shared/ContentNavbar";
import CustomButton from "../../../components/Shared/CustomButton";
import Private from "../../../components/Routes/Private";
import {
	AppLoader,
	GeneralContentLoader,
} from "../../../components/Shared/Loaders";
import { _pagination_number_ } from "../../../config/constants";
import ContentTableContainer from "../../../components/Shared/ContentTableContainer";
import AcademicYearsTable from "../../../components/Tables/AcademicYearsTable";
import {
	useAddAcademicYearMutation,
	useEditAcademicYearMutation,
	useGetAcademicYearsQuery,
} from "../../../lib/api/AcademicYear/academicYearEndpoints";
import CustomModal from "../../../components/Shared/CustomModal";
import NewAcademicYearForm from "../../../components/Forms/NewAcademicYearForm";
import handleAPIRequests from "../../../helpers/handleAPIRequests";
import Paginator from "../../../components/Shared/Paginator";
import { useSelector } from "react-redux";

const AcademicYears = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [itemToEdit, setItemToEdit] = useState(null);
	const [currentPage, setCurrentPage] = useState(0);

	const [form] = Form.useForm();

	const lang = useSelector((state) => state?.translation?.payload);

	const handleCancel = () => {
		setIsVisible(false);
		setItemToEdit(null);
	};

	const {
		data: academicYears,
		isLoading,
		isFetching,
	} = useGetAcademicYearsQuery({
		page: currentPage,
		size: _pagination_number_,
	});

	const [addAcademicYear, { isLoading: isAddingAcademicYear }] =
		useAddAcademicYearMutation();

	const [editAcademicYear, { isLoading: isEditing }] =
		useEditAcademicYearMutation();

	const handleAddAcademicYearSuccess = () => {
		!itemToEdit && setCurrentPage(0);
		handleCancel();
		form.resetFields();
	};

	useEffect(() => {
		if (itemToEdit) {
			form.setFieldsValue({
				name: itemToEdit?.name?.split("-")[0] || itemToEdit?.name,
				current: itemToEdit?.current ? "YES" : "NO",
			});
		}
	}, [form, itemToEdit]);

	const onAddAcademicYearFinish = (values) => {
		const formattedYear = `${
			typeof +values.name !== "number"
				? values.name
				: `${values.name} - ${+values.name + 1}`
		}`;

		const data = {
			...values,
			name: formattedYear,
			current: !!(values.current === "YES"),
		};

		handleAPIRequests({
			request: itemToEdit ? editAcademicYear : addAcademicYear,
			...data,
			id: itemToEdit?.id,
			notify: true,
			onSuccess: handleAddAcademicYearSuccess,
		});
	};

	const isPageLoading = isLoading;

	const RightSide = () => (
		<CustomButton onClick={() => setIsVisible(true)} type="primary">
			{lang?.academic_years_pg?.new_btn}
		</CustomButton>
	);

	const LeftSide = () => (
		<p className="text-[20px] text-dark font-semibold">
			{academicYears?.payload?.totalItems || ""}{" "}
			{lang?.academic_years_pg?.title}
		</p>
	);

	return (
		<>
			<CustomModal
				isVisible={isVisible}
				setIsVisible={setIsVisible}
				loading={isAddingAcademicYear || isEditing}
				width={600}
				handleCancel={handleCancel}
				title={
					itemToEdit
						? lang?.academic_years_pg?.modals?.edit_year_title
						: lang?.academic_years_pg?.modals?.add_year_title
				}
				footerContent={
					<CustomButton
						loading={isAddingAcademicYear || isEditing}
						type="primary"
						htmlType="submit"
						form="add-academic-year"
					>
						{lang?.dashboard_shared?.buttons?.save}
					</CustomButton>
				}
			>
				<NewAcademicYearForm
					form={form}
					onFinish={onAddAcademicYearFinish}
					lang={lang}
				/>
			</CustomModal>

			<ContentNavbar left={<LeftSide />} right={<RightSide />} />

			{/* Content */}
			{isPageLoading ? (
				<GeneralContentLoader />
			) : (
				<ContentTableContainer>
					<div
						style={{ maxHeight: "calc(100vh - 250px)" }}
						className="mt-5 h-[fit-content] overflow-x-auto"
					>
						{isLoading ? (
							<AppLoader />
						) : (
							<AcademicYearsTable
								academicYears={academicYears?.payload?.items}
								setItemToEdit={setItemToEdit}
								setIsEditModalVisible={setIsVisible}
								isFetching={isFetching}
								lang={lang}
							/>
						)}

						<Paginator
							total={academicYears?.payload?.totalItems}
							setCurrentPage={setCurrentPage}
							totalPages={academicYears?.payload?.totalPages}
						/>
					</div>
				</ContentTableContainer>
			)}
		</>
	);
};

export default Private(AcademicYears);
