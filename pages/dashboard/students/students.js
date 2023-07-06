import React, { useState, useEffect } from "react";
import Form from "antd/lib/form";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Dropdown from "antd/lib/dropdown";
import ContentNavbar from "../../../components/Shared/ContentNavbar";
import CustomButton from "../../../components/Shared/CustomButton";
import CustomModal from "../../../components/Shared/CustomModal";
import CustomInput from "../../../components/Shared/CustomInput";
import Private from "../../../components/Routes/Private";
import {
	useGetClassesQuery,
	useLazyGetStreamsQuery,
} from "../../../lib/api/Classrooms/classroomsEndpoints";
import {
	useAddStudentMutation,
	useEditStudentMutation,
	useGetStudentsQuery,
	useLazyGetSingleStudentQuery,
} from "../../../lib/api/Students/studentsEndpoints";
import {
	AppLoader,
	GeneralContentLoader,
} from "../../../components/Shared/Loaders";
import handleAPIRequests from "../../../helpers/handleAPIRequests";
import StudentsTable from "../../../components/Tables/StudentsTable";
import { _pagination_number_ } from "../../../config/constants";
import ContentTableContainer from "../../../components/Shared/ContentTableContainer";
import { useGetAcademicYearsQuery } from "../../../lib/api/AcademicYear/academicYearEndpoints";
import NewStudentForm from "../../../components/Forms/NewStudentForm";
import uploadFile from "../../../helpers/uploadFile";
import useHandleNewStudentForm from "../../../components/Forms/useHandleNewStudentForm";
import Notify from "../../../components/Shared/Notification";
import Paginator from "../../../components/Shared/Paginator";
import { useSelector } from "react-redux";
import { useWindowSize } from "../../../helpers/useWindowSize";
import CustomImage from "../../../components/Shared/CustomImage";
import { isImageValid } from "../../../helpers/isImageValid";

const Students = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const [search, setSearch] = useState("");
	const [classroomId, setClassroomId] = useState("");
	const [newStudentSelectedClassroomId, setNewStudentSelectedClassroomId] =
		useState("");
	const [streamId, setStreamId] = useState("");
	const [academicYearId, setAcademicYearId] = useState("");
	const [uploadLoading, setUploadLoading] = useState(false);
	const [imgURL, setImgURL] = useState(null);
	const [selectedCountry, setSelectedCountry] = useState(null);
	const [itemToEdit, setItemToEdit] = useState(null);

	const handleCancel = () => {
		setItemToEdit(null);
		setIsVisible(false);
		setImgURL(null);
	};

	const {
		data: students,
		isLoading,
		isFetching,
	} = useGetStudentsQuery({
		page: currentPage,
		size: _pagination_number_,
		streamId,
		academicYearId,
		classroomId,
		search,
	});

	const { data: classes, isFetching: isClassLoading } = useGetClassesQuery({});

	const lang = useSelector((state) => state?.translation?.payload);

	const [
		getSingleStudent,
		{ data: studentData, isFetching: isGetStudentLoading },
	] = useLazyGetSingleStudentQuery();

	const { data: academicYears, isFetching: isAcademicYearsLoading } =
		useGetAcademicYearsQuery({});

	const [getStreams, { data: streams, isFetching: isStreamLoading }] =
		useLazyGetStreamsQuery();

	const [addStudent, { isLoading: isAddingClass }] = useAddStudentMutation();

	const [editStudent, { isLoading: isEditingStudent }] =
		useEditStudentMutation();

	const classroomIDFromResponse =
		itemToEdit?.studentPromotions.length &&
		itemToEdit?.studentPromotions[0]?.stream?.classroom?.id;

	const canFetchStreams =
		classroomId || newStudentSelectedClassroomId || classroomIDFromResponse;

	useEffect(() => {
		if (itemToEdit) {
			handleAPIRequests({
				request: getSingleStudent,
				id: itemToEdit?.id,
				onError: handleCancel,
			});
		}
	}, [getSingleStudent, itemToEdit]);

	useEffect(() => {
		setImgURL(studentData?.payload?.passportPhoto);
	}, [studentData]);

	useEffect(() => {
		if (canFetchStreams) {
			handleAPIRequests({
				request: getStreams,
				id:
					classroomId ||
					newStudentSelectedClassroomId ||
					classroomIDFromResponse,
			});
		}
	}, [
		canFetchStreams,
		classroomIDFromResponse,
		classroomId,
		getStreams,
		newStudentSelectedClassroomId,
	]);

	const [form] = Form.useForm();

	const onSuccess = () => {
		setIsVisible(false);
		setCurrentPage(0);
		setSearch("");
		form.resetFields();
	};

	const onAddStudentFinish = (values) => {
		const data = {
			...values,
			countryCode: selectedCountry?.code,
			passportPhoto: imgURL,
		};

		delete data?.classroomId;

		handleAPIRequests({
			request: itemToEdit ? editStudent : addStudent,
			onSuccess: onSuccess,
			notify: true,
			id: itemToEdit?.id,
			message: itemToEdit
				? lang?.alert_messages?.success?.edit_student
				: lang?.alert_messages?.success?.add_student,
			...data,
		});
	};

	const onSearchChange = (value) => {
		setSearch(value);
		setCurrentPage(0);
	};

	const handleClassChange = (value) => {
		setClassroomId(value);
		setCurrentPage(0);
		setStreamId("");
	};

	const handleStreamChange = (value) => {
		setStreamId(value);
		setCurrentPage(0);
	};

	const handleAcademicYearChange = (value) => {
		setAcademicYearId(value);
		setCurrentPage(0);
	};

	const handleUploadProfile = (files) => {
		const isValid = isImageValid(files);

		isValid
			? uploadFile({
					files,
					setUploadLoading,
					setImgURL,
			  })
			: Notify({
					message: "Invalid file type",
					description:
						"Only, PNG, JPG, JPEG Images are valid formats to be uploaded!",
					type: "error",
			  });
	};

	useHandleNewStudentForm({
		form,
		itemToEdit: itemToEdit ? studentData?.payload : null,
	});

	useEffect(() => {
		if (academicYears?.payload?.items?.length) {
			setAcademicYearId(academicYears?.payload?.items[0]?.id);
		}
	}, [academicYears]);

	const isPageLoading = isLoading;

	const academicYearsList = academicYears?.payload?.totalItems
		? [
				...academicYears?.payload?.items?.map((item) => ({
					key: item?.name,
					value: item?.id,
					label: item.name,
				})),
		  ]
		: [];

	const classesList = classes?.payload?.items?.length
		? [
				...classes?.payload?.items?.map((item) => ({
					key: item?.id,
					value: item?.id,
					label: item.name,
				})),
		  ]
		: [];

	const streamsList =
		streams?.payload?.items?.length && !isStreamLoading
			? [
					...streams?.payload?.items?.map((item) => ({
						key: item?.id,
						value: item?.id,
						label: item.name,
					})),
			  ]
			: [];

	const { width } = useWindowSize();
	const isScreenSmall = width <= 1024;

	const RightSide = () => (
		<CustomButton onClick={() => setIsVisible(true)} type="primary">
			{lang?.students_pg?.new_btn}
		</CustomButton>
	);

	const LeftSide = () => (
		<p className="text-[20px] text-dark font-semibold">
			{students?.payload?.totalItems || ""} {lang?.students_pg?.title}
		</p>
	);

	const FiltersDropdown = (
		<div className="w-[fit-content] rounded shadow-md z-100 bg-white p-4 mt-6 flex flex-col gap-4">
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

			<CustomInput
				onChange={handleClassChange}
				value={classroomId}
				type="small-select"
				label={lang?.dashboard_shared?.filters?.class?.name}
				options={[
					{
						key: 0,
						value: "",
						label: lang?.dashboard_shared?.filters?.class?.sub_title,
					},
					...classesList,
				]}
				isLoading={isClassLoading}
			/>

			<CustomInput
				onChange={handleStreamChange}
				value={streamId}
				type="small-select"
				label={lang?.dashboard_shared?.filters?.stream?.name}
				options={[
					{
						key: 0,
						value: "",
						label: lang?.dashboard_shared?.filters?.stream?.sub_title,
					},
					...streamsList,
				]}
				isLoading={isStreamLoading}
			/>
		</div>
	);

	return (
		<>
			<CustomModal
				isVisible={isVisible}
				setIsVisible={setIsVisible}
				loading={isAddingClass || isEditingStudent}
				width={700}
				handleCancel={handleCancel}
				title={
					itemToEdit
						? lang?.students_pg?.modals?.edit_student_title
						: lang?.students_pg?.modals?.add_student_title
				}
				footerContent={
					!isGetStudentLoading && (
						<CustomButton
							loading={isAddingClass || uploadLoading || isEditingStudent}
							type="primary"
							htmlType="submit"
							form="add-student"
						>
							{lang?.dashboard_shared?.buttons?.save}
						</CustomButton>
					)
				}
			>
				{isGetStudentLoading ? (
					<AppLoader height="60vh" />
				) : (
					<NewStudentForm
						form={form}
						onFinish={onAddStudentFinish}
						academicYears={academicYears}
						classes={classes}
						streams={streams}
						setClassroomId={setNewStudentSelectedClassroomId}
						uploadLoading={uploadLoading}
						handleUploadProfile={handleUploadProfile}
						isClassLoading={isClassLoading}
						isStreamLoading={isStreamLoading}
						isAcademicYearsLoading={isAcademicYearsLoading}
						setSelectedCountry={setSelectedCountry}
						imgURL={imgURL || itemToEdit?.passportPhoto}
					/>
				)}
			</CustomModal>

			<ContentNavbar left={<LeftSide />} right={<RightSide />} />

			{/* Content */}
			{isPageLoading ? (
				<GeneralContentLoader />
			) : (
				<ContentTableContainer>
					<Row
						align="middle"
						justify="space-between"
						wrap={!isScreenSmall}
						gutter={12}
					>
						<Col>
							<div className="w-[100%]">
								<CustomInput
									onChange={onSearchChange}
									placeholder={lang?.dashboard_shared?.messages?.type_to_search}
								/>
							</div>
						</Col>

						<Col className="mb-3">
							{isScreenSmall ? (
								<Dropdown overlay={FiltersDropdown} trigger={["click"]}>
									<div className="p-2 bg-gray-200 pointer rounded h-[40px] w-[42px] flex items-center">
										<CustomImage
											src="/icons/filter_icon.svg"
											className="w-full"
										/>
									</div>
								</Dropdown>
							) : (
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
													label:
														lang?.dashboard_shared?.filters?.year?.sub_title,
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
											onChange={handleStreamChange}
											value={streamId}
											type="small-select"
											label={lang?.dashboard_shared?.filters?.stream?.name}
											options={[
												{
													key: 0,
													value: "",
													label:
														lang?.dashboard_shared?.filters?.stream?.sub_title,
												},
												...streamsList,
											]}
											isLoading={isStreamLoading}
										/>
									</Col>
								</Row>
							)}
						</Col>
					</Row>

					<div
						style={{
							maxHeight: isScreenSmall
								? "calc(100vh - 260px)"
								: "calc(100vh - 300px)",
						}}
						className=" mt-1 h-[fit-content] overflow-x-auto"
					>
						{isLoading ? (
							<AppLoader />
						) : (
							<StudentsTable
								students={students?.payload?.items}
								isFetching={isFetching}
								setItemToEdit={setItemToEdit}
								setIsEditModalVisible={setIsVisible}
								lang={lang}
								currentAcademicYearId={academicYearId}
								currentClassroomId={classroomId}
								currentStreamId={streamId}
							/>
						)}

						<Paginator
							total={students?.payload?.totalItems}
							setCurrentPage={setCurrentPage}
							totalPages={students?.payload?.totalPages}
						/>
					</div>
				</ContentTableContainer>
			)}
		</>
	);
};

export default Private(Students);
