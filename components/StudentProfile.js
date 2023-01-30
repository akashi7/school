import React from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import CustomButton from "./Shared/CustomButton";
import CustomImage from "./Shared/CustomImage";

const StudentProfile = ({ data }) => {
	return (
		<div className="bg-white p-6">
			<Row gutter={32} justify="space-between" align="top">
				<Col>
					<Row align="middle" gutter={32}>
						<Col>
							<CustomImage
								src="/imgs/profile.jpg"
								width={120}
								height={120}
								className="object-cover"
							/>
						</Col>

						<Col className="flex flex-col h-[120px] gap-0 mb-3">
							<div>
								<p className="text-dark text-[32px] font-semibold">
									{data?.payload?.fullName || "-- ---"}
								</p>

								<p className="text-black">
									Class: <span className="text-gray-400">S2 B</span>
								</p>
							</div>

							<div>
								<p>
									Unpaid: <span className="text-red">1200 Rwf</span>
								</p>
							</div>
						</Col>
					</Row>
				</Col>

				<Col>
					<div className="flex gap-12">
						<CustomButton type="edit">Edit</CustomButton>
						<CustomButton type="delete">Delete</CustomButton>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default StudentProfile;
