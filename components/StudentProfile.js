import React from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import CustomButton from "./Shared/CustomButton";
import CustomImage from "./Shared/CustomImage";
import { BeingPromotedLoader } from "./Shared/Loaders";
import { toLocalString } from "../helpers/numbers";
import { isTokenValid } from "../helpers/verifyToken";

const StudentProfile = ({
	data,
	isFetching,
	setIsVisible = () => null,
	setIsWarningVisible = () => null,
	setIsPromoteModalVisible = () => null,
	totalUnpaid,
	lang,
	isScreenSmall,
}) => {
	const { role } = isTokenValid();

	return (
		<div className="bg-white p-6 relative">
			{isFetching && <BeingPromotedLoader />}

			<Row gutter={32} align="middle" justify="center" wrap={isScreenSmall}>
				<Col
					span={isScreenSmall && 24}
					className={`${
						isScreenSmall && "flex items-center justify-center mb-4"
					}`}
				>
					<CustomImage
						src={data?.payload?.passportPhoto}
						width={120}
						height={120}
						className="object-cover rounded"
					/>
				</Col>

				<Col
					flex={1}
					className={`flex flex-col ${
						isScreenSmall ? "h-[fit-content]" : "h-[120px]"
					} gap-0 mb-3 justify-between`}
				>
					{/* Names and buttons */}
					<div>
						<Row align="top" wrap={isScreenSmall} justify="space-between">
							<Col span={isScreenSmall && 24}>
								<p
									className={`text-dark text-[32px] font-semibold ${
										isScreenSmall && "text-center w-full"
									}`}
								>
									{data?.payload?.fullName}
								</p>
							</Col>

							{!isScreenSmall && (
								<Col>
									{role !== "STUDENT" && (
										<Col>
											<div className="flex gap-4">
												<CustomButton
													type="view"
													onClick={() => setIsPromoteModalVisible(true)}
												>
													{lang?.dashboard_shared?.buttons?.promote}
												</CustomButton>

												<CustomButton
													type="edit"
													onClick={() => setIsVisible(true)}
												>
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
									)}
								</Col>
							)}
						</Row>

						<Row
							wrap={isScreenSmall}
							justify={isScreenSmall ? "center" : "start"}
							gutter={12}
							className="text-black text-[14px]"
						>
							<Col span={isScreenSmall && 24}>
								<p className="text-center">
									{lang?.students_pg?.modals?.class}:{" "}
									<span className="text-gray-400">
										{data?.payload?.stream?.classroom?.name}{" "}
										{data?.payload?.stream?.name}
									</span>
								</p>
							</Col>

							<Col>
								<span className="block w-[100%]">
									{lang?.students_pg?.modals?.academic_year}:{" "}
									<span className="text-gray-400">
										{data?.payload?.academicYear?.name}
									</span>
								</span>
							</Col>
						</Row>
					</div>

					<p
						className={`flex gap-4 w-[fit-content] items-center ${
							isScreenSmall && "justify-center w-full mt-2"
						}`}
					>
						<span>{lang?.students_pg?.profile?.total_unpaid}</span>

						<span className="text-red font-medium">
							{toLocalString(totalUnpaid || 0)} Rwf
						</span>
					</p>

					{role !== "STUDENT" && isScreenSmall && (
						<div className="flex m-auto w-[210px] my-4 gap-4">
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
					)}
				</Col>
			</Row>
		</div>
	);
};

export default StudentProfile;
