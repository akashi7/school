import React, { useEffect, useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Dropdown from "antd/lib/dropdown";
import StudentProfile from "../../../components/StudentProfile";
import ContentTableContainer from "../../../components/Shared/ContentTableContainer";
import ContentNavbar from "../../../components/Shared/ContentNavbar";
import CustomInput from "../../../components/Shared/CustomInput";
import AssignedFeesTable from "../../../components/Tables/AssignedFeesTable";
import {
	useGetStudentFeesQuery,
	useLazyGetSingleStudentQuery,
} from "../../../lib/api/Students/studentsEndpoints";
import handleAPIRequests from "../../../helpers/handleAPIRequests";
import Private from "../../../components/Routes/Private";
import { AppLoader } from "../../../components/Shared/Loaders";
import { Empty } from "../../../components/Shared/Empty";
import { useGetAcademicYearsQuery } from "../../../lib/api/AcademicYear/academicYearEndpoints";
import { termOptions } from "../../../config/constants";
import { isTokenValid } from "../../../helpers/verifyToken";
import { useSelector } from "react-redux";
import { useWindowSize } from "../../../helpers/useWindowSize";
import CustomImage from "../../../components/Shared/CustomImage";

const SingleStudent = () => {
	const [academicYearId, setAcademicYearId] = useState("");
	const [academicTerm, setAcademicTerm] = useState("TERM1");
	const [feeStatus, setFeeStatus] = useState("PAID");

	const { id } = isTokenValid("");

	const lang = useSelector((state) => state?.translation?.payload);

	const { data: academicYears, isFetching: isAcademicYearsLoading } =
		useGetAcademicYearsQuery({});

	const { data: studentFees, isFetching: isStudentFeesFetching } =
		useGetStudentFeesQuery({
			id,
			academicTerm,
			academicYearId,
			status: feeStatus,
		});

	const [getSingleStudent, { data, isLoading, isFetching }] =
		useLazyGetSingleStudentQuery();

	useEffect(() => {
		if (academicYears?.payload?.items?.length) {
			setAcademicYearId(academicYears?.payload?.items[0]?.id);
		}
	}, [academicYears]);

	useEffect(() => {
		handleAPIRequests({
			request: getSingleStudent,
			id,
		});
	}, [getSingleStudent, id]);

	const handleAcademicYearChange = (value) => {
		setAcademicYearId(value);
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
		<>
			{isLoading ? (
				<AppLoader />
			) : !data ? (
				<Empty message="The item you are looking for is not available!" />
			) : (
				<>
					<StudentProfile
						data={data}
						isFetching={isFetching}
						setIsVisible={() => null}
						setIsWarningVisible={() => null}
						setIsPromoteModalVisible={() => null}
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
				</>
			)}
		</>
	);
};

export default Private(SingleStudent);
