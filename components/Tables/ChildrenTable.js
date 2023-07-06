import React from "react";
import Table from "antd/lib/table";
import CustomImage from "../Shared/CustomImage";
import ChildrenTableMobile from "./Mobile/ChildrenTableMobile";
import CustomButton from "../Shared/CustomButton";
import { useRouter } from "next/router";
import routes from "../../config/routes";

const { Column } = Table;

const ChildrenTable = ({ isFetching, data, lang, isScreenSmall }) => {
	const router = useRouter();
  console.log({data})
	return (
		<>
			{isScreenSmall ? (
				<ChildrenTableMobile
					dataSource={data}
					loading={isFetching}
					lang={lang}
				/>
			) : (
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

					<Column
						title={lang?.students_pg?.table?.actions}
						key="actions"
						width={80}
						render={(record) => (
							<div className="flex gap-4">
								<CustomButton
									type="view"
									onClick={() =>
										router.push(`${routes.children.url}/${record?.id}`)
									}
								>
									{lang?.dashboard_shared?.buttons?.view}
								</CustomButton>
							</div>
						)}
					/>
				</Table>
			)}
		</>
	);
};

export default ChildrenTable;
