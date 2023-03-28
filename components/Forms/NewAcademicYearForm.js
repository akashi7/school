import React from "react";
import Form from "antd/lib/form";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import CustomInput from "../Shared/CustomInput";
import requiredField from "../../helpers/requiredField";
import { yearsGenerator } from "../../helpers/dates";

const NewAcademicYearForm = ({ onFinish, form, lang }) => {
	return (
		<Form form={form} name="add-academic-year" onFinish={onFinish}>
			<Row align="middle" wrap={false} gutter={24}>
				<Col className="w-[100%]">
					<CustomInput
						label={lang?.academic_years_pg?.modals?.academic_year}
						type="select"
						name="name"
						showSearch={true}
						options={yearsGenerator()}
						rules={requiredField("Academic year")}
					/>
				</Col>
			</Row>
		</Form>
	);
};

export default NewAcademicYearForm;
