import React from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Dropdown from "antd/lib/dropdown";
import CustomImage from "../../Shared/CustomImage";
import CustomButton from "../../Shared/CustomButton";
import { MobileTableLoader } from "../../Shared/Loaders";

const SchoolsTableMobile = ({
	dataSource,
	loading,
	lang,
	handleDeleteSchool,
}) => {
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
					<Row align="middle" justify="space-between" wrap={false} gutter={4}>
						<Col className="flex items-center gap-4">
							<CustomImage
								src={record?.schoolLogo}
								width={38}
								height={38}
								className="object-cover rounded-full"
							/>

							<span className="block font-bold text-[18px]">
								{record?.schoolName}
							</span>
						</Col>

						<Col>
							<Dropdown
								overlay={
									<div className="w-[fit-content] rounded shadow-md z-100 bg-white p-4 flex flex-col gap-4">
										<CustomButton
											type="delete"
											onClick={() => handleDeleteSchool(record)}
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

					<div className="pl-10 mt-3">
						<span className="text-[14px] mb-2 flex items-top gap-3">
							{lang?.schools_pg?.table?.title}:{" "}
							<span className="text-gray-500">{record?.schoolTitle}</span>
						</span>

						<span className="text-[14px] mb-2 flex items-top gap-3">
							{lang?.schools_pg?.table?.type}:{" "}
							<span className="text-gray-500">{record?.schoolType}</span>
						</span>

						<span className="text-[14px] mb-2 flex items-top gap-3">
							{lang?.schools_pg?.table?.country}:{" "}
							<span className="text-gray-500">{record?.countryName}</span>
						</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default SchoolsTableMobile;
