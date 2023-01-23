import React from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout/index";
import StudentProfile from "../../../components/StudentProfile";
import ContentTableContainer from "../../../components/Shared/ContentTableContainer";
import ContentNavbar from "../../../components/Shared/ContentNavbar";
import CustomInput from "../../../components/Shared/CustomInput";
import DownloadButton from "../../../components/Shared/DownloadButton";
import GoBack from "../../../components/Shared/GoBack";
import AssignedFeesTable from "../../../components/Tables/AssignedFeesTable";

const SingleStudent = () => {
	const router = useRouter();

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
						type="select"
						label="Status"
						options={[
							{ key: 1, value: "Unpaid", name: "Unpaid" },
							{ key: 2, value: "Paid", name: "Paid" },
						]}
						defaultValue="Unpaid"
					/>
				</Col>

				<Col>
					<CustomInput
						type="select"
						label="Term"
						options={[
							{ key: 1, value: "I", name: "I" },
							{ key: 2, value: "II", name: "II" },
							{ key: 3, value: "III", name: "III" },
						]}
						defaultValue="II"
					/>
				</Col>

				<Col>
					<CustomInput
						type="select"
						label="Year"
						options={[
							{ key: 1, value: "2023", name: "2023" },
							{ key: 2, value: "2022", name: "2022" },
						]}
						defaultValue="2023"
					/>
				</Col>

				<Col>
					<DownloadButton />
				</Col>
			</Row>
		</>
	);

	return (
		<Layout>
			<StudentProfile />

			<ContentTableContainer>
				<ContentNavbar
					left={<TableNavLeftSide />}
					right={<TableNavRightSide />}
				/>

				<div className="mt-5 h-[55vh] overflow-x-auto">
					<AssignedFeesTable />
				</div>
			</ContentTableContainer>
		</Layout>
	);
};

export default SingleStudent;
