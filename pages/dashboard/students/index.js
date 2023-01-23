import React, { useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Layout from "../../../components/Layout/index";
import ContentNavbar from "../../../components/Shared/ContentNavbar";
import CustomButton from "../../../components/Shared/CustomButton";
import CustomModal from "../../../components/Shared/CustomModal";
import CustomInput from "../../../components/Shared/CustomInput";
import ContentTableContainer from "../../../components/Shared/ContentTableContainer";
import DownloadButton from "../../../components/Shared/DownloadButton";
import SingleClass from "../../../components/SingleClass";
import StudentsTable from "../../../components/Tables/StudentsTable";

const Students = () => {
	const [isVisible, setIsVisible] = useState(false);

	const RightSide = () => (
		<CustomButton onClick={() => setIsVisible(true)} type="primary">
			New student
		</CustomButton>
	);

	const LeftSide = () => (
		<p className="text-[20px] text-dark font-semibold">120 Students</p>
	);

	const TableNavLeftSide = () => (
		<CustomInput placeholder="type to search..." />
	);

	const TableNavRightSide = () => (
		<>
			<Row align="middle" gutter={24}>
				<Col>
					<CustomInput
						type="select"
						label="Class"
						options={[
							{ key: 1, value: "P1", name: "P1" },
							{ key: 2, value: "P2", name: "P2" },
						]}
						defaultValue="P1"
					/>
				</Col>

				<Col>
					<CustomInput
						type="select"
						label="Stream"
						options={[
							{ key: 1, value: "A", name: "A" },
							{ key: 2, value: "B", name: "B" },
						]}
						defaultValue="A"
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
			<CustomModal
				isVisible={isVisible}
				setIsVisible={setIsVisible}
				title="Add a student"
				footerContent={<CustomButton type="primary">Save</CustomButton>}
			>
				<CustomInput label="Class name" placeholder="Class name..." />
			</CustomModal>

			<ContentNavbar left={<LeftSide />} right={<RightSide />} />

			<ContentTableContainer>
				<ContentNavbar
					left={<TableNavLeftSide />}
					right={<TableNavRightSide />}
				/>

				<div className="mt-5 h-[70vh] overflow-x-auto">
					<StudentsTable />
				</div>
			</ContentTableContainer>
		</Layout>
	);
};

export default Students;
