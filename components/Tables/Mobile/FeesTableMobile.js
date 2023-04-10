import React from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Dropdown from "antd/lib/dropdown";
import CustomImage from "../../Shared/CustomImage";
import CustomButton from "../../Shared/CustomButton";
import { MobileTableLoader } from "../../Shared/Loaders";

const FeesTableMobile = ({
	dataSource,
	loading,
	lang,
	handleEditFee,
	handleDeleteFee,
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
					<Row
						align="top"
						justify="space-between"
						wrap={false}
						className="mb-2"
					>
						<Col>
							<span className="block font-bold text-[18px]">
								{record?.name}
							</span>
						</Col>

						<Col>
							<Dropdown
								overlay={
									<div className="w-[fit-content] rounded shadow-md z-100 bg-white p-4 flex flex-col gap-4">
										<CustomButton
											type="edit"
											onClick={() => handleEditFee(record)}
										>
											{lang?.dashboard_shared?.buttons?.edit}
										</CustomButton>

										<CustomButton
											type="delete"
											onClick={() => handleDeleteFee(record)}
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

					<span
						className={`bg-gray-200 px-2 py-[4px] text-[12px] rounded ${
							record.type === "School fee" && "font-medium bg-edit_bg"
						} ${record.type === "Optional" && "bg-gray-200 text-gray-400"}`}
					>
						{record?.type?.replace("_", " ")}
					</span>

					<span className="text-[14px] block mt-4">
						{lang?.fees_pg?.table?.classes}:{" "}
						<span>
							{record?.classrooms?.map((classroom) => `${classroom?.name}, `)}
						</span>
					</span>

					<span className="text-[14px] block mt-1">
						{lang?.fees_pg?.table?.terms}:{" "}
						<span>{record?.academicTerms?.map((term) => `${term}, `)} </span>
					</span>

					<span className="text-[14px] block mt-1">
						{lang?.fees_pg?.table?.year}:{" "}
						<span>{record?.academicYear?.name}</span>
					</span>
				</div>
			))}
		</div>
	);
};

export default FeesTableMobile;
