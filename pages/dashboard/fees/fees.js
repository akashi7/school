import React, { useEffect, useState } from "react";
import Form from "antd/lib/form";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { LoadingOutlined } from "@ant-design/icons";
import ContentNavbar from "../../../components/Shared/ContentNavbar";
import CustomButton from "../../../components/Shared/CustomButton";
import CustomModal from "../../../components/Shared/CustomModal";
import CustomInput from "../../../components/Shared/CustomInput";
import Private from "../../../components/Routes/Private";
import { useGetClassesQuery } from "../../../lib/api/Classrooms/classroomsEndpoints";
import { GeneralContentLoader } from "../../../components/Shared/Loaders";
import handleAPIRequests from "../../../helpers/handleAPIRequests";
import FeesTable from "../../../components/Tables/FeesTable";
import { termOptions, _pagination_number_ } from "../../../config/constants";
import ContentTableContainer from "../../../components/Shared/ContentTableContainer";
import NewFeeForm from "../../../components/Forms/NewFeeForm";
import {
	useAddFeeMutation,
	useDownloadFeesMutation,
	useEditFeeMutation,
	useGetFeesQuery,
} from "../../../lib/api/Fees/FeesEndpoints";
import Paginator from "../../../components/Shared/Paginator";
import { Empty } from "../../../components/Shared/Empty";
import { useGetAcademicYearsQuery } from "../../../lib/api/AcademicYear/academicYearEndpoints";
import { Dropdown } from "antd";
import CustomImage from "../../../components/Shared/CustomImage";
import handleDownloadFile from "../../../helpers/handleDownloadFile";
import { useSelector } from "react-redux";

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
	const [academicYearId, setAcademicYearId] = useState("");

	const lang = useSelector((state) => state?.translation?.payload);

	const [form] = Form.useForm();

	const handleCancelEditModal = () => {
		setIsVisible(false);
		setItemToEdit(null);
		form.resetFields();
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
		academicYearId,
	});

	const { data: classes, isFetching: isClassLoading } = useGetClassesQuery({});
	const { data: academicYears, isFetching: isAcademicYearsLoading } =
		useGetAcademicYearsQuery({});

	const [addFee, { isLoading: isAddingFee }] = useAddFeeMutation();
	const [editFee, { isLoading: isEditingFee }] = useEditFeeMutation();
	const [downloadReport, { isLoading: isDownloadLoading }] =
		useDownloadFeesMutation();

	const onSuccess = () => {
		setIsVisible(false);
		setCurrentPage(0);
		setSearch("");
		setClassroomId("");
		setFeeType("");
		setTermId("");
		setIsPaymentAdditional(false);
		setIsPaymentOPtional(false);
		setAcademicYearId("");
		form.resetFields();
	};

	const handleEditFeeSuccess = () => {
		setIsVisible(false);
		form.resetFields();
	};

	const handleDownloadReportSuccess = (file) => {
		handleDownloadFile({ name: "Fees-Report", file });
	};

	const onAddFeeFinish = (values) => {
		const data = {
			...values,
			optional: !!isPaymentOPtional,
			type: isPaymentAdditional ? "ADDITIONAL_FEE" : "SCHOOL_FEE",
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

	const handleDownloadFeeReport = (url) => {
		handleAPIRequests({
			request: downloadReport,
			search,
			classroomId,
			term: termId,
			type: feeType,
			academicYearId,
			url,
			onSuccess: handleDownloadReportSuccess,
			notify: true,
		});
	};

	const showEmpty = fees?.payload?.totalItems <= 0;

	const isPageLoading = isLoading;

	const handleAcademicYearChange = (value) => {
		setAcademicYearId(value);
	};

	const classesList = classes?.payload?.items?.length
		? [
				...classes?.payload?.items?.map((item) => ({
					key: item?.id,
					value: item?.id,
					label: item.name,
				})),
		  ]
		: [];

	const academicYearsList = academicYears?.payload?.totalItems
		? [
				...academicYears?.payload?.items?.map((item) => ({
					key: item?.name,
					value: item?.id,
					label: item.name,
				})),
		  ]
		: [];

	const DownloadOverlay = (
		<div className="p-4 w-[100%] bg-gray-200 rounded shadow-sm">
			<p
				className="transition ease-in-out delay-120 mb-2 hover:bg-gray-300 hover:p-2 hover:px-4 hover:rounded pointer"
				onClick={() => handleDownloadFeeReport("students")}
			>
				{lang?.fees_pg?.download_btn?.for_students}
			</p>

			<p
				className="transition ease-in-out delay-120 hover:bg-gray-300 hover:p-2 hover:px-4 hover:rounded pointer"
				onClick={() => handleDownloadFeeReport("classrooms")}
			>
				{lang?.fees_pg?.download_btn?.for_classrooms}
			</p>
		</div>
	);

	const RightSide = () => (
		<Row gutter={24} align="middle">
			<Col>
				<Dropdown
					overlay={
						isDownloadLoading || !academicYearId ? <></> : DownloadOverlay
					}
					trigger={["click"]}
				>
					<div
						className={`flex items-center gap-6 bg-gray-200 p-4 py-3 rounded ${
							isDownloadLoading || !academicYearId
								? "cursor-not-allowed"
								: " cursor-pointer"
						}`}
					>
						{isDownloadLoading ? (
							<LoadingOutlined style={{ fontSize: 16 }} spin />
						) : (
							<CustomImage
								src="/icons/download.svg"
								width={18}
								height={18}
								className={`${!academicYearId ? "opacity-60" : "opacity-1"}`}
							/>
						)}

						<span
							className={`${
								isDownloadLoading || !academicYearId
									? "opacity-60"
									: "opacity-1"
							}  text-[14px] font-medium ml-2`}
						>
							{lang?.fees_pg?.download_btn?.title}
						</span>

						<CustomImage
							src="/icons/expand.svg"
							width={14}
							height={14}
							className={` ${
								isDownloadLoading || !academicYearId
									? "opacity-60"
									: "opacity-1"
							}  object-cover rounded-full`}
						/>
					</div>
				</Dropdown>
			</Col>

			<Col>
				<CustomButton onClick={() => setIsVisible(true)} type="primary">
					{lang?.fees_pg?.new_btn}
				</CustomButton>
			</Col>
		</Row>
	);

	const LeftSide = () => (
		<p className="text-[20px] text-dark font-semibold">
			{fees?.payload?.totalItems || ""} {lang?.fees_pg?.title}
		</p>
	);

	return (
		<>
			<CustomModal
				isVisible={isVisible}
				setIsVisible={setIsVisible}
				loading={isAddingFee || isEditingFee}
				handleCancel={handleCancelEditModal}
				width={550}
				title={
					itemToEdit
						? lang?.fees_pg?.modals?.edit_fee_title
						: lang?.fees_pg?.modals?.add_fee_title
				}
				footerContent={
					<CustomButton
						loading={isAddingFee || isEditingFee}
						type="primary"
						htmlType="submit"
						form="add-class"
					>
						{lang?.dashboard_shared?.buttons?.save}
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
								placeholder={lang?.dashboard_shared?.messages?.type_to_search}
							/>
						</Col>

						<Col>
							<Row align="middle" gutter={24}>
								<Col>
									<CustomInput
										onChange={handleAcademicYearChange}
										value={academicYearId}
										type="small-select"
										label={lang?.dashboard_shared?.filters?.year?.name}
										options={[
											{
												key: 0,
												value: "",
												label: lang?.dashboard_shared?.filters?.year?.sub_title,
											},
											...academicYearsList,
										]}
										isLoading={isAcademicYearsLoading}
									/>
								</Col>

								<Col>
									<CustomInput
										onChange={handleClassChange}
										value={classroomId}
										type="small-select"
										label={lang?.dashboard_shared?.filters?.class?.name}
										options={[
											{
												key: 0,
												value: "",
												label:
													lang?.dashboard_shared?.filters?.class?.sub_title,
											},
											...classesList,
										]}
										isLoading={isClassLoading}
									/>
								</Col>

								<Col>
									<CustomInput
										onChange={handleTermChange}
										value={termId}
										type="small-select"
										label={lang?.dashboard_shared?.filters?.term?.name}
										options={[
											{
												key: 0,
												value: "",
												label: lang?.dashboard_shared?.filters?.term?.sub_title,
											},
											...termOptions,
										]}
									/>
								</Col>

								<Col>
									<CustomInput
										onChange={handleFeeTypeChange}
										value={feeType}
										type="small-select"
										label={lang?.dashboard_shared?.filters?.type?.name}
										options={[
											{
												key: 0,
												value: "",
												label: lang?.dashboard_shared?.filters?.type?.sub_title,
											},
											{ key: 1, value: "SCHOOL_FEE", label: "School fee" },
											{
												key: 2,
												value: "ADDITIONAL_FEE",
												label: "Additional fee",
											},
										]}
									/>
								</Col>
							</Row>
						</Col>
					</Row>

					<div
						style={{ maxHeight: "calc(100vh - 310px)" }}
						className="mt-5 h-[fit-content] overflow-x-auto"
					>
						{showEmpty ? (
							<Empty className="mt-6 h-[62vh]" />
						) : (
							<FeesTable
								fees={fees}
								isFetching={isFetching}
								setItemToEdit={setItemToEdit}
								setIsVisible={setIsVisible}
								lang={lang}
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
