import React, { useState, useEffect } from "react";
import Form from "antd/lib/form";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import ContentNavbar from "../../../components/Shared/ContentNavbar";
import CustomButton from "../../../components/Shared/CustomButton";
import CustomModal from "../../../components/Shared/CustomModal";
import CustomInput from "../../../components/Shared/CustomInput";
import Private from "../../../components/Routes/Private";
import {
	useAddClassMutation,
	useGetClassesQuery,
	useLazyGetStreamsQuery,
} from "../../../lib/api/Classrooms/classroomsEndpoints";
import { useGetStudentsQuery } from "../../../lib/api/Students/studentsEndpoints";
import {
	AppLoader,
	GeneralContentLoader,
} from "../../../components/Shared/Loaders";
import DownloadButton from "../../../components/Shared/DownloadButton";
import requiredField from "../../../helpers/requiredField";
import handleAPIRequests from "../../../helpers/handleAPIRequests";
import StudentsTable from "../../../components/Tables/StudentsTable";
import { _pagination_number_ } from "../../../config/constants";
import ContentTableContainer from "../../../components/Shared/ContentTableContainer";
import { useGetAcademicYearsQuery } from "../../../lib/api/AcademicYear/academicYearEndpoints";

const Students = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const [search, setSearch] = useState("");
	const [classroomId, setClassroomId] = useState("");
	const [streamId, setStreamId] = useState("");
	const [academicYearId, setAcademicYearId] = useState("");

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

	const { data: classes, isLoading: isClassLoading } = useGetClassesQuery({});

	const { data: academicYears, isLoading: isAcademicYearsLoading } =
		useGetAcademicYearsQuery({});

	const [getStreams, { data: streams, isFetching: isStreamLoading }] =
		useLazyGetStreamsQuery();

	const [addClass, { isLoading: isAddingClass }] = useAddClassMutation();

	useEffect(() => {
		if (classroomId) {
			handleAPIRequests({
				request: getStreams,
				id: classroomId,
			});
		}
	}, [getStreams, classroomId]);

	const [form] = Form.useForm();

	const onSuccess = () => {
		setIsVisible(false);
		setCurrentPage(0);
		setSearch("");
		form.resetFields();
	};

	const onAddClassFinish = (values) => {
		handleAPIRequests({
			request: addClass,
			onSuccess: onSuccess,
			notify: true,
			...values,
		});
	};

	const onSearchChange = (value) => {
		setSearch(value);
		setCurrentPage(0);
	};

	const handleClassChange = (value) => {
		setStreamId("");
		setClassroomId(value);
	};

	const handleStreamChange = (value) => {
		setStreamId(value);
	};

	const handleAcademicYearChange = (value) => {
		setAcademicYearId(value);
	};

	const isPageLoading = isLoading || isClassLoading || isAcademicYearsLoading;

	const showStreamOption = streams?.payload?.items?.length >= 1;

	const RightSide = () => (
		<CustomButton onClick={() => setIsVisible(true)} type="primary">
			New student
		</CustomButton>
	);

	const LeftSide = () => (
		<p className="text-[20px] text-dark font-semibold">
			{students?.payload?.items?.length || ""} Students
		</p>
	);

	return (
		<>
			<CustomModal
				isVisible={isVisible}
				setIsVisible={setIsVisible}
				loading={isAddingClass}
				title="Create student"
				footerContent={
					<CustomButton
						loading={isAddingClass}
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
			{isPageLoading ? (
				<GeneralContentLoader />
			) : (
				<ContentTableContainer>
					<Row align="middle" justify="space-between">
						<Col className="w-[350px]">
							<CustomInput
								onChange={onSearchChange}
								placeholder="type to search..."
							/>
						</Col>

						<Col>
							<Row align="middle" gutter={24}>
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
									{!isStreamLoading && showStreamOption && (
										<CustomInput
											onChange={handleStreamChange}
											value={streamId}
											type="small-select"
											label="Stream"
											options={[
												{ key: 0, value: "", label: "Select stream" },
												...streams?.payload?.items?.map((item) => ({
													key: item?.id,
													value: item?.id,
													label: item.name,
												})),
											]}
										/>
									)}
								</Col>

								<Col>
									{academicYears?.payload?.items?.length >= 1 && (
										<CustomInput
											onChange={handleAcademicYearChange}
											value={academicYearId}
											type="small-select"
											label="Year"
											options={[
												{ key: 0, value: "", label: "Select year" },
												...academicYears?.payload?.items?.map((item) => ({
													key: item?.id,
													value: item?.id,
													label: item.name,
												})),
											]}
										/>
									)}
								</Col>

								<Col>
									<DownloadButton />
								</Col>
							</Row>
						</Col>
					</Row>

					<div className="mt-5 h-[60vh] 2xl:h-[68vh] overflow-x-auto">
						{isFetching ? (
							<AppLoader />
						) : (
							<StudentsTable students={students?.payload?.items} />
						)}
					</div>
				</ContentTableContainer>
			)}
		</>
	);
};

export default Private(Students);
