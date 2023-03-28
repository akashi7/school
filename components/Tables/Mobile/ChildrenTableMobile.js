import React from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Dropdown from "antd/lib/dropdown";
import CustomImage from "../../Shared/CustomImage";
import CustomButton from "../../Shared/CustomButton";
import { MobileTableLoader } from "../../Shared/Loaders";

const ChildrenTableMobile = ({ dataSource, loading, lang }) => {
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
								src={record?.passportPhoto}
								width={38}
								height={38}
								className="object-cover rounded-full"
							/>

							<span className="block font-bold text-[18px]">
								{record?.fullName}
							</span>
						</Col>
					</Row>

					<div className="pl-12 mt-3">
						<span className="text-[14px] mb-2 flex items-top gap-3">
							{lang?.children_pg?.table?.school}:
							<span className="text-gray-500">
								{record?.school?.schoolTitle}
							</span>
						</span>

						<span className="text-[14px] mb-2 flex items-top gap-3">
							{lang?.children_pg?.table?.class}:
							<span className="text-gray-500">{`${record?.stream?.classroom?.name} ${record?.stream?.name}`}</span>
						</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default ChildrenTableMobile;
