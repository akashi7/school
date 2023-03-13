import React from "react";
import Table from "antd/lib/table";
import CustomImage from "../Shared/CustomImage";

const { Column } = Table;

const ChildrenTable = ({ isFetching, data, lang }) => {
	return (
		<>
			<Table
				className="data_table"
				dataSource={data}
				rowKey={(record) => {
					return record?.id;
				}}
				rowClassName="shadow"
				pagination={false}
				loading={isFetching}
				bordered={false}
				scroll={{ x: 0 }}
			>
				<Column
					title="#"
					key="#"
					width={24}
					render={(record) => (
						<CustomImage
							src={record?.passportPhoto}
							width={38}
							height={38}
							className="object-cover rounded-full"
						/>
					)}
				/>

				<Column
					title={lang?.children_pg?.table?.name}
					key="name"
					render={(record) => (
						<span className="font-bold">{record?.fullName}</span>
					)}
				/>

				<Column
					title={lang?.children_pg?.table?.school}
					key="title"
					render={(record) => <span>{record?.school?.schoolTitle}</span>}
				/>

				<Column
					title={lang?.children_pg?.table?.class}
					key="type"
					render={(record) => (
						<span>{`${record?.stream?.classroom?.name} ${record?.stream?.name}`}</span>
					)}
				/>
			</Table>
		</>
	);
};

export default ChildrenTable;
