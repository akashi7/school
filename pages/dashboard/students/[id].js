import React, { useEffect, useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Form from "antd/lib/form";
import { useRouter } from "next/router";
import Dropdown from "antd/lib/dropdown";
import Layout from "../../../components/Layout/index";
import StudentProfile from "../../../components/StudentProfile";
import ContentTableContainer from "../../../components/Shared/ContentTableContainer";
import ContentNavbar from "../../../components/Shared/ContentNavbar";
import CustomInput from "../../../components/Shared/CustomInput";
import GoBack from "../../../components/Shared/GoBack";
import AssignedFeesTable from "../../../components/Tables/AssignedFeesTable";
import {
	useDeleteStudentMutation,
	useEditStudentMutation,
	useGetStudentFeesQuery,
	useLazyGetSingleStudentQuery,
	usePromoteStudentMutation,
} from "../../../lib/api/Students/studentsEndpoints";
import handleAPIRequests from "../../../helpers/handleAPIRequests";
import Private from "../../../components/Routes/Private";
import { AppLoader } from "../../../components/Shared/Loaders";
import { Empty } from "../../../components/Shared/Empty";
import CustomModal from "../../../components/Shared/CustomModal";
import CustomButton from "../../../components/Shared/CustomButton";
import NewStudentForm from "../../../components/Forms/NewStudentForm";
import { useGetAcademicYearsQuery } from "../../../lib/api/AcademicYear/academicYearEndpoints";
import {
	useGetClassesQuery,
	useLazyGetStreamsQuery,
} from "../../../lib/api/Classrooms/classroomsEndpoints";
import uploadFile from "../../../helpers/uploadFile";
import Notify from "../../../components/Shared/Notification";
import useHandleNewStudentForm from "../../../components/Forms/useHandleNewStudentForm";
import WarningModal from "../../../components/Shared/WarningModal";
import routes from "../../../config/routes";
import { termOptions } from "../../../config/constants";
import PromoteStudentForm from "../../../components/Forms/PromoteStudentForm";
import { useSelector } from "react-redux";
import { useWindowSize } from "../../../helpers/useWindowSize";
import CustomImage from "../../../components/Shared/CustomImage";

const SingleStudent = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [classroomId, setClassroomId] = useState("");
	const [newStudentSelectedClassroomId, setNewStudentSelectedClassroomId] =
		useState("");
	const [uploadLoading, setUploadLoading] = useState(false);
	const [imgURL, setImgURL] = useState(null);
	const [selectedCountry, setSelectedCountry] = useState(null);
	const [academicYearId, setAcademicYearId] = useState("");
	const [itemToEdit, setItemToEdit] = useState(null);
	const [isWarningVisible, setIsWarningVisible] = useState(false);
	const [isPromoteModalVisible, setIsPromoteModalVisible] = useState(false);
	const [academicTerm, setAcademicTerm] = useState("TERM1");
	const [feeStatus, setFeeStatus] = useState("PAID");

	const handleCancel = () => {
		setItemToEdit(null);
		setIsVisible(false);
	};

	const handleCancelPromoteModal = () => {
		setIsPromoteModalVisible(false);
	};

	const router = useRouter();
	const { id } = router.query;
	const [form] = Form.useForm();

	const lang = useSelector((state) => state?.translation?.payload);

	const { data: academicYears, isFetching: isAcademicYearsLoading } =
		useGetAcademicYearsQuery({});

	const { data: classes, isFetching: isClassLoading } = useGetClassesQuery({});
	const { data: studentFees, isFetching: isStudentFeesFetching } =
		useGetStudentFeesQuery({
			id,
			academicTerm,
			academicYearId,
			status: feeStatus,
		});

	const [getStreams, { data: streams, isFetching: isStreamLoading }] =
		useLazyGetStreamsQuery();

	const [getSingleStudent, { data, isLoading, isFetching }] =
		useLazyGetSingleStudentQuery();

	const [editStudent, { isLoading: isEditingStudent }] =
		useEditStudentMutation();

	const [deleteStudent, { isLoading: isDeleting }] = useDeleteStudentMutation();
	const [promoteStudent, { isLoading: isPromotingStudent }] =
		usePromoteStudentMutation();

	useEffect(() => {
		if (academicYears?.payload?.items?.length) {
			setAcademicYearId(academicYears?.payload?.items[0]?.id);
		}
	}, [academicYears]);

	const canFetchStreams =
		classroomId ||
		newStudentSelectedClassroomId ||
		itemToEdit?.stream?.classroom?.id;

	useEffect(() => {
		handleAPIRequests({
			request: getSingleStudent,
			onError: handleCancel,
			id,
		});
	}, [getSingleStudent, id]);

	useEffect(() => {
		setImgURL(data?.payload?.passportPhoto);
		setItemToEdit(data?.payload);
	}, [data]);

	useEffect(() => {
		if (canFetchStreams) {
			handleAPIRequests({
				request: getStreams,
				id:
					classroomId ||
					newStudentSelectedClassroomId ||
					itemToEdit?.stream?.classroom?.id,
			});
		}
	}, [
		canFetchStreams,
		classroomId,
		getStreams,
		itemToEdit,
		newStudentSelectedClassroomId,
	]);

	const onSuccess = () => {
		setIsVisible(false);
		form.resetFields();
	};

	const onEditStudentFinish = (values) => {
		const data = {
			...values,
			countryCode: selectedCountry?.code,
			passportPhoto: imgURL,
		};

		delete data?.classroomId;

		handleAPIRequests({
			request: editStudent,
			message: lang?.alert_messages?.success?.edit_student,
			onSuccess: onSuccess,
			notify: true,
			id,
			...data,
		});
	};

	const handleUploadProfile = (files) => {
		const isValid =
			files[0]?.type === "image/png" ||
			files[0]?.type === "image/jpg" ||
			files[0]?.type === "image/jpeg" ||
			files[0]?.type === "image/svg+xml";

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

	useHandleNewStudentForm({ form, itemToEdit: data?.payload });

	const onDeleteStudentSuccess = () => {
		setIsWarningVisible(false);
		router.push(routes.students.url);
	};

	const handleAcademicYearChange = (value) => {
		setAcademicYearId(value);
	};

	const onPromoteStudentFinish = (values) => {
		handleAPIRequests({
			request: promoteStudent,
			id,
			notify: true,
			onSuccess: handleCancelPromoteModal,
			message: lang?.alert_messages?.success?.promote_student,
			...values,
		});
	};

	const handleTermChange = (term) => {
		setAcademicTerm(term);
	};

	const handleFeeStatusChange = (status) => {
		setFeeStatus(status);
	};

	const academicYearsList = academicYears?.payload?.totalItems
		? [
				...academicYears?.payload?.items?.map((item) => ({
					key: item?.name,
					value: item?.id,
					label: item.name,
				})),
		  ]
		: [];

	const totalUnpaid = studentFees?.payload?.reduce(
		(a, b) => a + b?.remaining,
		0
	);

	const { width } = useWindowSize();
	const isScreenSmall = width <= 1024;

	const TableNavLeftSide = () => (
		<Row align="middle" gutter={20}>
			<Col>
				<GoBack onClick={() => router.push(routes.students.url)} />
			</Col>

			<Col>
				<p className="text-[20px] text-dark font-semibold">
					{lang?.students_pg?.profile?.table?.title}
				</p>
			</Col>
		</Row>
	);

	const FiltersDropdown = () => (
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
				type="small-select"
				label={lang?.dashboard_shared?.filters?.term?.name}
				value={academicTerm}
				onChange={handleTermChange}
				options={[
					{
						key: 1,
						value: "",
						label: lang?.dashboard_shared?.filters?.term?.sub_title,
					},
					...termOptions,
				]}
			/>

			<CustomInput
				type="small-select"
				label={lang?.dashboard_shared?.filters?.status?.name}
				value={feeStatus}
				onChange={handleFeeStatusChange}
				options={[
					{
						key: 0,
						value: "",
						label: lang?.dashboard_shared?.filters?.status?.sub_title,
					},
					{ key: 1, value: "UNPAID", name: "Unpaid" },
					{ key: 2, value: "PAID", name: "Paid" },
				]}
			/>
		</div>
	);

	const TableNavRightSide = () =>
		isScreenSmall ? (
			<Dropdown overlay={FiltersDropdown} trigger={["click"]}>
				<div className="p-2 bg-gray-200 pointer rounded h-[40px] w-[42px] flex items-center">
					<CustomImage src="/icons/filter_icon.svg" className="w-full" />
				</div>
			</Dropdown>
		) : (
			<>
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
							type="small-select"
							label={lang?.dashboard_shared?.filters?.term?.name}
							value={academicTerm}
							onChange={handleTermChange}
							options={[
								{
									key: 1,
									value: "",
									label: lang?.dashboard_shared?.filters?.term?.sub_title,
								},
								...termOptions,
							]}
						/>
					</Col>

					<Col>
						<CustomInput
							type="small-select"
							label={lang?.dashboard_shared?.filters?.status?.name}
							value={feeStatus}
							onChange={handleFeeStatusChange}
							options={[
								{
									key: 0,
									value: "",
									label: lang?.dashboard_shared?.filters?.status?.sub_title,
								},
								{ key: 1, value: "UNPAID", name: "Unpaid" },
								{ key: 2, value: "PAID", name: "Paid" },
							]}
						/>
					</Col>
				</Row>
			</>
		);

	return (
		<Layout>
			<WarningModal
				isVisible={isWarningVisible}
				setIsVisible={setIsWarningVisible}
				warningMessage={`${lang?.dashboard_shared?.modals?.delete_modal?.title} ${lang?.students_pg?.student}`}
				warningKey={data?.payload?.fullName}
				itemToDelete={data?.payload?.id}
				request={deleteStudent}
				loading={isDeleting}
				onSuccess={onDeleteStudentSuccess}
				message={lang?.alert_messages?.success?.delete_student}
			/>

			<CustomModal
				isVisible={isVisible}
				setIsVisible={setIsVisible}
				loading={isEditingStudent}
				width={700}
				handleCancel={handleCancel}
				title={lang?.students_pg?.modals?.edit_student_title}
				subTitle={data?.payload?.fullName}
				footerContent={
					!isLoading && (
						<CustomButton
							loading={uploadLoading || isEditingStudent}
							type="primary"
							htmlType="submit"
							form="add-student"
						>
							{lang?.dashboard_shared?.buttons?.save}
						</CustomButton>
					)
				}
			>
				{isLoading ? (
					<AppLoader height="60vh" />
				) : (
					<NewStudentForm
						form={form}
						onFinish={onEditStudentFinish}
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

			<CustomModal
				isVisible={isPromoteModalVisible}
				setIsVisible={setIsPromoteModalVisible}
				loading={isPromotingStudent}
				width={700}
				handleCancel={handleCancelPromoteModal}
				title={lang?.students_pg?.profile?.modals?.promote_student_title}
				subTitle={data?.payload?.fullName}
				footerContent={
					<CustomButton
						loading={isPromotingStudent}
						type="primary"
						htmlType="submit"
						form="promote-student"
					>
						{lang?.dashboard_shared?.buttons?.save}
					</CustomButton>
				}
			>
				<PromoteStudentForm
					onFinish={onPromoteStudentFinish}
					academicYears={academicYears}
					classes={classes}
					streams={streams}
					setClassroomId={setClassroomId}
					isClassLoading={isClassLoading}
					isStreamLoading={isStreamLoading}
					isAcademicYearsLoading={isAcademicYearsLoading}
					data={data}
					isScreenSmall={isScreenSmall}
				/>
			</CustomModal>

			{isLoading ? (
				<AppLoader />
			) : !data ? (
				<Empty message={lang?.students_pg?.profile?.not_available_item} />
			) : (
				<div
					style={{ maxHeight: !isScreenSmall ? "" : "calc(100vh - 120px)" }}
					className={`${isScreenSmall && "overflow-y-auto h-[100vh]"}`}
				>
					<StudentProfile
						data={data}
						isFetching={isFetching}
						setIsVisible={setIsVisible}
						setIsWarningVisible={setIsWarningVisible}
						setIsPromoteModalVisible={setIsPromoteModalVisible}
						totalUnpaid={totalUnpaid}
						lang={lang}
						isScreenSmall={isScreenSmall}
					/>

					<ContentTableContainer>
						<ContentNavbar
							left={<TableNavLeftSide />}
							right={<TableNavRightSide />}
						/>

						<div
							style={{ maxHeight: isScreenSmall ? "" : "calc(100vh - 440px)" }}
							className={`mt-5 ${
								!isScreenSmall && "h-[fit-content] overflow-x-auto"
							}`}
						>
							<AssignedFeesTable
								data={studentFees}
								isFetching={isStudentFeesFetching}
								lang={lang}
								isScreenSmall={isScreenSmall}
							/>
						</div>
					</ContentTableContainer>
				</div>
			)}
		</Layout>
	);
};

export default Private(SingleStudent);
