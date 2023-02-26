import React, { useState } from "react";
import Table from "antd/lib/table";
import CustomButton from "../Shared/CustomButton";
import { useRouter } from "next/router";
import routes from "../../config/routes";
import CustomImage from "../Shared/CustomImage";

const { Column } = Table;

const ChildrenTable = ({ isFetching, data, lang }) => {
	const router = useRouter();

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
					render={(record) => <span>{record?.schoolTitle}</span>}
				/>

				<Column
					title={lang?.children_pg?.table?.class}
					key="type"
					render={(record) => <span>{record?.schoolType}</span>}
				/>

				<Column
					title="Actions"
					key="actions"
					width={100}
					render={(record) => (
						<div className="flex gap-12">
							<CustomButton
								type="view"
								onClick={() =>
									router.push(`${routes.students.url}/${record?.id}`)
								}
							>
								{lang?.dashboard_shared?.button?.view}
							</CustomButton>
						</div>
					)}
				/>
			</Table>
		</>
	);
};

export default ChildrenTable;
