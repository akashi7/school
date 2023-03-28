import React from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Dropdown from "antd/lib/dropdown";
import CustomImage from "../../Shared/CustomImage";
import CustomButton from "../../Shared/CustomButton";
import { useRouter } from "next/router";
import routes from "../../../config/routes";
import { MobileTableLoader } from "../../Shared/Loaders";

const StudentsTableMobile = ({
	dataSource,
	loading,
	lang,
	handleEditStudent,
	handleDeleteStudents,
}) => {
	const router = useRouter();

	return (
		<div
			className={`grid grid-cols-1 relative ${
				dataSource?.length <= 1
					? "sm:grid-cols-1 md:grid-cols-1"
					: "sm:grid-cols-2 md:grid-cols-2"
			} gap-4`}
		>
			{loading && <MobileTableLoader />}

			{dataSource?.map((record) => (
				<div key={record?.id} className="shadow-md p-4 bg-white border rounded">
					<Row align="top" justify="space-between" wrap={false}>
						<Col>
							<span className="block font-bold text-[18px]">
								{record?.fullName}
							</span>
						</Col>

						<Col>
							<Dropdown
								overlay={
									<div className="w-[fit-content] rounded shadow-md z-100 bg-white p-4 flex flex-col gap-4">
										<CustomButton
											type="view"
											onClick={() =>
												router.push(`${routes.students.url}/${record?.id}`)
											}
										>
											{lang?.dashboard_shared?.buttons?.view}
										</CustomButton>

										<CustomButton
											type="edit"
											onClick={() => handleEditStudent(record)}
										>
											{lang?.dashboard_shared?.buttons?.edit}
										</CustomButton>

										<CustomButton
											type="delete"
											onClick={() => handleDeleteStudents(record)}
										>
											{lang?.dashboard_shared?.buttons?.delete}
										</CustomButton>
									</div>
								}
								trigger={["click"]}
							>
								<CustomImage
									className="cursor-pointer"
									src="/icons/table_see_more.svg"
									width={18}
									height={18}
								/>
							</Dropdown>
						</Col>
					</Row>

					<span className="text-[14px] block mb-2">
						{lang?.students_pg?.table?.class}:{" "}
						<span className="text-gray-500">
							{record?.studentPromotions?.length &&
								`${record?.studentPromotions[0]?.stream?.classroom?.name} ${record?.studentPromotions[0]?.stream?.name}`}
						</span>
					</span>

					<span className="text-[14px]">
						{lang?.students_pg?.table?.location}:{" "}
						<span className="text-gray-500">{record?.address}</span>
					</span>
				</div>
			))}
		</div>
	);
};

export default StudentsTableMobile;
