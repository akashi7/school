import React from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import CustomButton from "./Shared/CustomButton";
import CustomImage from "./Shared/CustomImage";
import { BeingPromotedLoader } from "./Shared/Loaders";
import { toLocalString } from "../helpers/numbers";
import userType from "../helpers/userType";
import { isTokenValid } from "../helpers/verifyToken";

const EmployeeProfile = ({
	data,
	isFetching,
	setIsVisible = () => null,
	setIsWarningVisible = () => null,
	setIsPromoteModalVisible = () => null,
	totalUnpaid,
	lang,
	isScreenSmall,
	showAmount
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
						src={data?.payload?.employeePassportPhoto}
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
									{data?.payload?.employeeFullName}
								</p>
							</Col>

							{!isScreenSmall && (
								<Col>
									{userType(role).isSchool && (
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
									EMPLOYEE of
									<span className="text-gray-400 pl-3">
                  {data?.payload?.school?.schoolName}
									</span>
								</p>
							</Col>
						</Row>
					</div>

					{userType(role).isAdmin && isScreenSmall && (
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

export default EmployeeProfile;
