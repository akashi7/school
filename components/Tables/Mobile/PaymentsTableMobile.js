import Col from "antd/lib/col";
import Row from "antd/lib/row";
import React from "react";
import { toLocalString } from "../../../helpers/numbers";
import { MobileTableLoader } from "../../Shared/Loaders";

const PaymentsTableMobile = ({
	dataSource,
	loading,
	lang,
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
								{record?.date}
							</span>
						</Col>
					</Row>

          <span className="text-[14px] block mt-1">
						{lang?.students_pg?.profile?.table?.paid}:{" "}
						<span className="text-edit_blue font-medium">
							{record?.term} 
						</span>
					</span>

					<span className="text-[14px] block mt-4">
						{lang?.students_pg?.profile?.paymentTable?.amount}
						<span className="text-gray-500">
							{toLocalString(record?.amount)} Rwf
						</span>
					</span>

					<span className="text-[14px] block mt-1">
						{lang?.students_pg?.profile?.table?.remaining}:{" "}
						<span className="text-gray-500 bg-edit_bg font-medium">
							{record?.paymentMethod}
						</span>
					</span>
          <span className="text-[14px] block mt-1">
						{lang?.students_pg?.profile?.table?.remaining}:{" "}
						<span className="text-gray-500 font-medium">
							{record?.status}
						</span>
					</span>
				</div>
			))}
		</div>
	);
};

export default PaymentsTableMobile;
