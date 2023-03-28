import React, { useState } from "react";
import Table from "antd/lib/table";
import { toLocalString } from "../../helpers/numbers";

const { Column } = Table;

const inActiveTabClasses = "bg-gray-200 text-gray-500 hover:text-black";
const activeTabClasses = "hover:bg-dark hover:text-white bg-dark text-white";

const AnalyticsTable = () => {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<div className="mt-6">
			<div className="flex flex-col items-start md:flex-row md:items-center justify-between">
				<p className="text-gray-600 mb-4 md:mb-0">See what happened</p>

				<div className="rounded shadow p-2 flex  gap-4">
					<div
						onClick={() => setActiveTab(0)}
						className={`${
							!activeTab ? activeTabClasses : inActiveTabClasses
						} border-none px-4 py-2 rounded flex items-center justify-center text-[14px] cursor-pointer`}
					>
						Last month
					</div>

					<div
						onClick={() => setActiveTab(1)}
						className={`${
							activeTab ? activeTabClasses : inActiveTabClasses
						} border-none px-4 py-2 rounded flex items-center justify-center text-[14px] cursor-pointer`}
					>
						Last year
					</div>
				</div>
			</div>

			<Table
				className="data_table"
				dataSource={[{ id: 1, name: "Fees", counts: 123, value: 23345 }]}
				rowKey={(record) => {
					return record?.id;
				}}
				rowClassName="shadow"
				pagination={false}
				loading={false}
				bordered={false}
				scroll={{ x: 0 }}
			>
				<Column
					title="#"
					key="#"
					width={24}
					render={(text, record, index) => (
						<span className="text-gray-500">{index + 1}.</span>
					)}
				/>

				<Column
					title="Name"
					key="name"
					render={(record) => <span className="font-bold">{record?.name}</span>}
				/>

				<Column
					title="Counts"
					key="counts"
					render={(record) => <span>{toLocalString(record?.counts)}</span>}
				/>

				<Column
					title="Value"
					key="value"
					render={(record) => (
						<span>
							{record?.value ? `${toLocalString(record?.value)} Rwf` : "-"}
						</span>
					)}
				/>
			</Table>
		</div>
	);
};

export default AnalyticsTable;
