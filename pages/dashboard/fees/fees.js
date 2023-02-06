import React, { useEffect, useState } from "react";
import Form from "antd/lib/form";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import ContentNavbar from "../../../components/Shared/ContentNavbar";
import CustomButton from "../../../components/Shared/CustomButton";
import CustomModal from "../../../components/Shared/CustomModal";
import CustomInput from "../../../components/Shared/CustomInput";
import Private from "../../../components/Routes/Private";
import { useGetClassesQuery } from "../../../lib/api/Classrooms/classroomsEndpoints";
import {
	AppLoader,
	GeneralContentLoader,
} from "../../../components/Shared/Loaders";
import DownloadButton from "../../../components/Shared/DownloadButton";
import handleAPIRequests from "../../../helpers/handleAPIRequests";
import FeesTable from "../../../components/Tables/FeesTable";
import { termOptions, _pagination_number_ } from "../../../config/constants";
import ContentTableContainer from "../../../components/Shared/ContentTableContainer";
import NewFeeForm from "../../../components/Forms/NewFeeForm";
import {
	useAddFeeMutation,
	useEditFeeMutation,
	useGetFeesQuery,
} from "../../../lib/api/Fees/FeesEndpoints";
import Paginator from "../../../components/Shared/Paginator";
import { Empty } from "../../../components/Shared/Empty";
import { useGetAcademicYearsQuery } from "../../../lib/api/AcademicYear/academicYearEndpoints";

const Students = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const [search, setSearch] = useState("");
	const [classroomId, setClassroomId] = useState("");
	const [feeType, setFeeType] = useState("");
	const [termId, setTermId] = useState("");
	const [itemToEdit, setItemToEdit] = useState(null);
	const [isPaymentOPtional, setIsPaymentOPtional] = useState(false);
	const [isPaymentAdditional, setIsPaymentAdditional] = useState(false);

	const handleCancelEditModal = () => {
		setIsVisible(false);
		setItemToEdit(null);
	};

	useEffect(() => {
		setIsPaymentOPtional(itemToEdit?.optional);
		setIsPaymentAdditional(itemToEdit && itemToEdit?.type !== "SCHOOL_FEE");
	}, [itemToEdit]);

	const {
		data: fees,
		isLoading,
		isFetching,
	} = useGetFeesQuery({
		page: currentPage,
		size: _pagination_number_,
		search,
		classroomId,
		term: termId,
		type: feeType,
	});

	const { data: classes, isLoading: isClassLoading } = useGetClassesQuery({});
	const { data: academicYears } = useGetAcademicYearsQuery({});

	const [addFee, { isLoading: isAddingFee }] = useAddFeeMutation();
	const [editFee, { isLoading: isEditingFee }] = useEditFeeMutation();

	const [form] = Form.useForm();

	const onSuccess = () => {
		setIsVisible(false);
		setCurrentPage(0);
		setSearch("");
		setClassroomId("");
		setFeeType("");
		setTermId("");
		setIsPaymentAdditional(false);
		setIsPaymentOPtional(false);
		form.resetFields();
	};

	const handleEditFeeSuccess = () => {
		setIsVisible(false);
		form.resetFields();
	};

	const onAddFeeFinish = (values) => {
		// Needs to be updated when API is updated
		const data = {
			...values,
			optional: !!isPaymentOPtional,
			type: isPaymentAdditional ? "ADDITIONAL_FEE" : "SCHOOL_FEE",
			classroomId: values?.classroomIDs[0],
			amount: +values?.amount,
		};

		handleAPIRequests({
			request: itemToEdit ? editFee : addFee,
			notify: true,
			...data,
			id: itemToEdit?.id,
			onSuccess: itemToEdit ? handleEditFeeSuccess : onSuccess,
		});
	};

	const onSearchChange = (value) => {
		setSearch(value);
		setCurrentPage(0);
	};

	const handleClassChange = (value) => {
		setClassroomId(value);
	};

	const handleTermChange = (value) => {
		setTermId(value);
	};

	const handleFeeTypeChange = (value) => {
		setFeeType(value);
	};

	const showEmpty = fees?.payload?.totalItems <= 0;

	const isPageLoading = isLoading || isClassLoading;

	const RightSide = () => (
		<CustomButton onClick={() => setIsVisible(true)} type="primary">
			Add fee
		</CustomButton>
	);

	const LeftSide = () => (
		<p className="text-[20px] text-dark font-semibold">
			{fees?.payload?.items?.length || ""} Fees
		</p>
	);

	return (
		<>
			<CustomModal
				isVisible={isVisible}
				setIsVisible={setIsVisible}
				loading={isAddingFee || isEditingFee}
				handleCancel={handleCancelEditModal}
				width={750}
				title={itemToEdit ? "Edit fee" : "Add a fee"}
				footerContent={
					<CustomButton
						loading={isAddingFee || isEditingFee}
						type="primary"
						htmlType="submit"
						form="add-class"
					>
						Save
					</CustomButton>
				}
			>
				<NewFeeForm
					form={form}
					onFinish={onAddFeeFinish}
					isPaymentOPtional={isPaymentOPtional}
					setIsPaymentOPtional={setIsPaymentOPtional}
					isPaymentAdditional={isPaymentAdditional}
					setIsPaymentAdditional={setIsPaymentAdditional}
					classes={classes}
					academicYears={academicYears}
					itemToEdit={itemToEdit}
				/>
			</CustomModal>

			<ContentNavbar left={<LeftSide />} right={<RightSide />} />

			{/* Content */}
			{isPageLoading ? (
				<GeneralContentLoader />
			) : (
				<ContentTableContainer>
					<Row align="middle" justify="space-between">
						<Col className="w-[150px]">
							<CustomInput
								onChange={onSearchChange}
								placeholder="type to search..."
							/>
						</Col>

						<Col>
							<Row align="middle" gutter={24}>
								<Col>
									<CustomInput
										onChange={handleFeeTypeChange}
										value={feeType}
										type="small-select"
										label="Type"
										options={[
											{ key: 0, value: "", label: "Select type" },
											{ key: 1, value: "SCHOOL_FEE", label: "School fee" },
											{
												key: 2,
												value: "ADDITIONAL_FEE",
												label: "Additional fee",
											},
										]}
									/>
								</Col>

								<Col>
									{classes?.payload?.items?.length > 1 && (
										<CustomInput
											onChange={handleClassChange}
											value={classroomId}
											type="small-select"
											label="Class"
											options={[
												{ key: 0, value: "", label: "Select class" },
												...classes?.payload?.items?.map((item) => ({
													key: item?.id,
													value: item?.id,
													label: item.name,
												})),
											]}
										/>
									)}
								</Col>

								<Col>
									<CustomInput
										onChange={handleTermChange}
										value={termId}
										type="small-select"
										label="Term"
										options={[
											{ key: 0, value: "", label: "Select term" },
											...termOptions,
										]}
									/>
								</Col>

								<Col>
									<DownloadButton />
								</Col>
							</Row>
						</Col>
					</Row>

					<div className="mt-5 h-[60vh] 2xl:h-[68vh] overflow-x-auto">
						{showEmpty ? (
							<Empty className="mt-6 h-[62vh]" />
						) : (
							<FeesTable
								fees={fees}
								isFetching={isFetching}
								setItemToEdit={setItemToEdit}
								setIsVisible={setIsVisible}
							/>
						)}

						<Paginator
							total={fees?.payload?.totalItems}
							setCurrentPage={setCurrentPage}
							totalPages={fees?.payload?.totalPages}
							classes={classes}
						/>
					</div>
				</ContentTableContainer>
			)}
		</>
	);
};

export default Private(Students);
