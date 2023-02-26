import React, { useEffect, useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Form from "antd/lib/form";
import { useRouter } from "next/router";
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
import { isTokenValid } from "../../../helpers/verifyToken";

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
	const { id } = isTokenValid("");
	const [form] = Form.useForm();

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
			...values,
			notify: true,
			onSuccess: handleCancelPromoteModal,
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

	const TableNavLeftSide = () => (
		<Row align="middle" gutter={20}>
			<Col>
				<GoBack onClick={() => router.back()} />
			</Col>

			<Col>
				<p className="text-[20px] text-dark font-semibold">Assigned fees</p>
			</Col>
		</Row>
	);

	const TableNavRightSide = () => (
		<>
			<Row align="middle" gutter={24}>
				<Col>
					<CustomInput
						onChange={handleAcademicYearChange}
						value={academicYearId}
						type="small-select"
						label="Year"
						options={[
							{ key: 0, value: "", label: "Select year" },
							...academicYearsList,
						]}
						isLoading={isAcademicYearsLoading}
					/>
				</Col>

				<Col>
					<CustomInput
						type="small-select"
						label="Term"
						value={academicTerm}
						onChange={handleTermChange}
						options={[
							{ key: 1, value: "", label: "Select term" },
							...termOptions,
						]}
					/>
				</Col>

				<Col>
					<CustomInput
						type="small-select"
						label="Status"
						value={feeStatus}
						onChange={handleFeeStatusChange}
						options={[
							{ key: 0, value: "", label: "Select status" },
							{ key: 1, value: "UNPAID", name: "Unpaid" },
							{ key: 2, value: "PAID", name: "Paid" },
						]}
					/>
				</Col>
			</Row>
		</>
	);

	return (
		<>
			<WarningModal
				isVisible={isWarningVisible}
				setIsVisible={setIsWarningVisible}
				warningMessage="Do you really want to delete class"
				warningKey={data?.payload?.fullName}
				itemToDelete={data?.payload?.id}
				request={deleteStudent}
				loading={isDeleting}
				onSuccess={onDeleteStudentSuccess}
			/>

			<CustomModal
				isVisible={isVisible}
				setIsVisible={setIsVisible}
				loading={isEditingStudent}
				width={700}
				handleCancel={handleCancel}
				title="Edit student"
				subTitle={data?.payload?.fullName}
				footerContent={
					!isLoading && (
						<CustomButton
							loading={uploadLoading || isEditingStudent}
							type="primary"
							htmlType="submit"
							form="add-student"
						>
							Save
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
				title="Promote student"
				subTitle={data?.payload?.fullName}
				footerContent={
					<CustomButton
						loading={isPromotingStudent}
						type="primary"
						htmlType="submit"
						form="promote-student"
					>
						Save
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
				/>
			</CustomModal>

			{isLoading ? (
				<AppLoader />
			) : !data ? (
				<Empty message="The item you are looking for is not available!" />
			) : (
				<>
					<StudentProfile
						data={data}
						isFetching={isFetching}
						setIsVisible={setIsVisible}
						setIsWarningVisible={setIsWarningVisible}
						setIsPromoteModalVisible={setIsPromoteModalVisible}
						totalUnpaid={totalUnpaid}
					/>

					<ContentTableContainer>
						<ContentNavbar
							left={<TableNavLeftSide />}
							right={<TableNavRightSide />}
						/>

						<div className="mt-5 h-[55vh] overflow-x-auto">
							<AssignedFeesTable
								data={studentFees}
								isFetching={isStudentFeesFetching}
							/>
						</div>
					</ContentTableContainer>
				</>
			)}
		</>
	);
};

export default Private(SingleStudent);
