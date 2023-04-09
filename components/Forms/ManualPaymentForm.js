import React from "react";
import Form from "antd/lib/form";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import CustomInput from "../Shared/CustomInput";
import requiredField from "../../helpers/requiredField";
import { useGetAcademicYearsQuery } from "../../lib/api/AcademicYear/academicYearEndpoints";
import { termOptions } from "../../config/constants";

const ManualPaymentForm = ({ form, onFinish, lang }) => {
	const { data: academicYears, isFetching: isAcademicYearsLoading } =
		useGetAcademicYearsQuery({
			page: 0,
			size: 100,
		});

	const academicYearsList = academicYears?.payload?.totalItems
		? [
				...academicYears?.payload?.items?.map((item) => ({
					key: item?.name,
					value: item?.id,
					label: item.name,
				})),
		  ]
		: [];

	return (
		<Form form={form} name="manual-payment" onFinish={onFinish}>
			<Row align="middle" wrap={false} gutter={24}>
				<Col className="w-[50%]">
					<CustomInput
						label={lang?.students_pg?.modals?.amount}
						placeholder={`${lang?.students_pg?.modals?.amount}...`}
						name="amount"
						rules={requiredField(lang?.students_pg?.modals?.amount)}
					/>
				</Col>

				<Col className="w-[50%]">
					<CustomInput
						label={lang?.students_pg?.modals?.date}
						placeholder={`${lang?.students_pg?.modals?.date}...`}
						name="date"
						type="date"
						rules={requiredField(lang?.students_pg?.modals?.date)}
					/>
				</Col>
			</Row>

			<Row align="middle" wrap={false} gutter={24}>
				<Col className="w-[50%]">
					<CustomInput
						label={lang?.students_pg?.modals?.reference_code}
						placeholder={`${lang?.students_pg?.modals?.reference_code}...`}
						name="referenceCode"
						rules={requiredField(lang?.students_pg?.modals?.reference_code)}
					/>
				</Col>

				<Col className="w-[50%]">
					<CustomInput
						label={lang?.students_pg?.modals?.phone_number}
						placeholder={`${lang?.students_pg?.modals?.phone_number}...`}
						name="phoneNumber"
						rules={requiredField(lang?.students_pg?.modals?.phone_number)}
					/>
				</Col>
			</Row>

			<Row align="middle" wrap={false} gutter={24}>
				<Col className="w-[50%]">
					<CustomInput
						type="select"
						name="academicYearId"
						label={lang?.students_pg?.modals?.academic_year}
						isLoading={isAcademicYearsLoading}
						rules={requiredField(lang?.students_pg?.modals?.academic_year)}
						options={academicYearsList}
					/>
				</Col>

				<Col className="w-[50%]">
					<CustomInput
						type="select"
						name="academicTerm"
						label={lang?.dashboard_shared?.filters?.term?.name}
						rules={requiredField(lang?.dashboard_shared?.filters?.term?.name)}
						options={[
							{
								key: 1,
								value: "",
								label: lang?.dashboard_shared?.filters?.term?.sub_title,
							},
							...termOptions,
						]}
					/>
				</Col>
			</Row>

			<Row align="middle" wrap={false} gutter={24}>
				<Col className="w-[100%]">
					<CustomInput
						label={lang?.students_pg?.modals?.description}
						placeholder={`${lang?.students_pg?.modals?.description}...`}
						name="description"
						rules={requiredField(lang?.students_pg?.modals?.description)}
					/>
				</Col>
			</Row>
		</Form>
	);
};

export default ManualPaymentForm;
