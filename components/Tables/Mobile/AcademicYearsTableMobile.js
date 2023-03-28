import React from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Dropdown from "antd/lib/dropdown";
import Switch from "antd/lib/switch";
import {
	CheckOutlined,
	CloseOutlined,
	LoadingOutlined,
} from "@ant-design/icons";
import CustomImage from "../../Shared/CustomImage";
import CustomButton from "../../Shared/CustomButton";
import { MobileTableLoader } from "../../Shared/Loaders";
import moment from "moment";

const AcademicYearsTableMobile = ({
	dataSource,
	loading,
	lang,
	handleDeleteAcademicYear,
	isToggling,
	isFetching,
	handleSetCurrentYear,
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
							<span className="block font-bold text-[18px]">
								{record?.name}
							</span>
						</Col>

						<Col>
							<Dropdown
								overlay={
									<div className="w-[fit-content] rounded shadow-md z-100 bg-white p-4 flex flex-col gap-4">
										<CustomButton
											type="delete"
											onClick={() => handleDeleteAcademicYear(record)}
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

					<span className="text-[14px] mb-2 flex items-top gap-3 mt-4">
						{lang?.academic_years_pg?.table?.since}:{" "}
						<span className="text-gray-500">
							{moment(record?.createdAt).fromNow()}
						</span>
					</span>

					<span className="text-[14px] mb-2 flex items-top gap-3">
						{lang?.academic_years_pg?.table?.is_current}:{" "}
						{!isToggling(record) && !isFetching ? (
							<Switch
								checkedChildren={<CheckOutlined />}
								unCheckedChildren={<CloseOutlined />}
								defaultChecked={record?.current}
								onClick={() => handleSetCurrentYear(record)}
							/>
						) : (
							<LoadingOutlined style={{ fontSize: 16 }} spin />
						)}
					</span>
				</div>
			))}
		</div>
	);
};

export default AcademicYearsTableMobile;
