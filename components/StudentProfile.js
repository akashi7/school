import React from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import CustomButton from "./Shared/CustomButton";
import CustomImage from "./Shared/CustomImage";
import { BeingPromotedLoader } from "./Shared/Loaders";
import { toLocalString } from "../helpers/numbers";
import { useSelector } from "react-redux";

const StudentProfile = ({
	data,
	isFetching,
	setIsVisible,
	setIsWarningVisible,
	setIsPromoteModalVisible,
	totalUnpaid,
}) => {
	const lang = useSelector((state) => state?.translation?.payload);

	return (
		<div className="bg-white p-6 relative">
			{isFetching && <BeingPromotedLoader />}

			<Row gutter={32} justify="space-between" align="top">
				<Col>
					<Row align="middle" gutter={32}>
						<Col>
							<CustomImage
								src={data?.payload?.passportPhoto}
								width={120}
								height={120}
								className="object-cover rounded"
							/>
						</Col>

						<Col className="flex flex-col h-[120px] gap-0 mb-3">
							<div>
								<p className="text-dark text-[32px] font-semibold">
									{data?.payload?.fullName}
								</p>

								<div className="text-black text-[14px] grid grid-cols-4 gap-0">
									<span className="">
										{lang?.students_pg?.modals?.class}:{" "}
										<span className="text-gray-400">
											{data?.payload?.stream?.classroom?.name}{" "}
											{data?.payload?.stream?.name}
										</span>
									</span>

									<span className="">
										{lang?.students_pg?.modals?.academic_year}:{" "}
										<span className="text-gray-400">
											{data?.payload?.academicYear?.name}
										</span>
									</span>
								</div>
							</div>

							<div>
								<p className="flex gap-12 w-[fit-content] items-center">
									<span>{lang?.students_pg?.profile?.total_unpaid}</span>

									<span className="text-red font-medium">
										{toLocalString(totalUnpaid || 0)} Rwf
									</span>
								</p>
							</div>
						</Col>
					</Row>
				</Col>

				<Col>
					<div className="flex gap-12">
						<CustomButton
							type="view"
							onClick={() => setIsPromoteModalVisible(true)}
						>
							{lang?.dashboard_shared?.buttons?.promote}
						</CustomButton>

						<CustomButton type="edit" onClick={() => setIsVisible(true)}>
							{lang?.dashboard_shared?.buttons?.edit}
						</CustomButton>

						<CustomButton
							type="delete"
							onClick={() => setIsWarningVisible(true)}
						>
							{lang?.dashboard_shared?.buttons?.delete}
						</CustomButton>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default StudentProfile;
