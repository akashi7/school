import React, { useState } from "react";
import Form from "antd/lib/form";
import ContentNavbar from "../../../components/Shared/ContentNavbar";
import CustomButton from "../../../components/Shared/CustomButton";
import CustomModal from "../../../components/Shared/CustomModal";
import Private from "../../../components/Routes/Private";
import {
	AppLoader,
	GeneralContentLoader,
} from "../../../components/Shared/Loaders";
import { _pagination_number_ } from "../../../config/constants";
import ContentTableContainer from "../../../components/Shared/ContentTableContainer";
import {
	useGetSchoolsQuery,
	useAddSchoolMutation,
} from "../../../lib/api/Schools/schoolsEndpoints";
import SchoolsTable from "../../../components/Tables/SchoolsTable";
import NewSchoolForm from "../../../components/Forms/NewSchoolForm";
import uploadFile from "../../../helpers/uploadFile";
import Notify from "../../../components/Shared/Notification";
import handleAPIRequests from "../../../helpers/handleAPIRequests";
import { useSelector } from "react-redux";
import { useWindowSize } from "../../../helpers/useWindowSize";

const Schools = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [uploadLoading, setUploadLoading] = useState(false);
	const [imgURL, setImgURL] = useState(null);
	const [selectedCountry, setSelectedCountry] = useState(null);

	const { data: schools, isLoading, isFetching } = useGetSchoolsQuery();
	const [addSchool, { isLoading: isAddingSchool }] = useAddSchoolMutation();

	const lang = useSelector((state) => state?.translation?.payload);

	const [form] = Form.useForm();

	const handleCancel = () => {
		setIsVisible(false);
		setImgURL(null);
		setSelectedCountry(null);
	};

	const handleUploadProfile = (files) => {
		const isValid =
			files[0]?.type === "image/png" ||
			files[0]?.type === "image/jpg" ||
			files[0]?.type === "image/jpeg" ||
			files[0]?.type === "image/svg+xml";

		isValid
			? uploadFile({
					files,
					setUploadLoading,
					setImgURL,
			  })
			: Notify({
					message: "Invalid file type",
					description:
						"Only, PNG, JPG, JPEG Images are valid formats to be uploaded!",
					type: "error",
			  });
	};

	const onAddSchoolFinish = (values) => {
		const data = {
			...values,
			countryCode: selectedCountry?.code,
			hasStudentIds: !!(values?.hasStudentIds === "YES"),
			schoolLogo: imgURL,
		};

		handleAPIRequests({
			request: addSchool,
			...data,
			notify: true,
			onSuccess: handleCancel,
		});
	};

	const isPageLoading = isLoading;

	const { width } = useWindowSize();
	const isScreenSmall = width <= 1024;

	const RightSide = () => (
		<CustomButton onClick={() => setIsVisible(true)} type="primary">
			{lang?.schools_pg?.new_btn}
		</CustomButton>
	);

	const LeftSide = () => (
		<p className="text-[20px] text-dark font-semibold">
			{schools?.payload?.length || ""} {lang?.schools_pg?.title}
		</p>
	);

	return (
		<>
			<CustomModal
				isVisible={isVisible}
				setIsVisible={setIsVisible}
				loading={isAddingSchool}
				width={700}
				handleCancel={handleCancel}
				title={lang?.schools_pg?.modals?.add_school_title}
				footerContent={
					<CustomButton
						loading={isAddingSchool || uploadLoading}
						type="primary"
						htmlType="submit"
						form="add-school"
					>
						{lang?.dashboard_shared?.buttons?.save}
					</CustomButton>
				}
			>
				<NewSchoolForm
					form={form}
					onFinish={onAddSchoolFinish}
					uploadLoading={uploadLoading}
					handleUploadProfile={handleUploadProfile}
					imgURL={imgURL}
					setSelectedCountry={setSelectedCountry}
					lang={lang}
					isScreenSmall={isScreenSmall}
				/>
			</CustomModal>

			<ContentNavbar left={<LeftSide />} right={<RightSide />} />

			{/* Content */}
			{isPageLoading ? (
				<GeneralContentLoader />
			) : (
				<ContentTableContainer>
					<div
						style={{ maxHeight: "calc(100vh - 250px)" }}
						className="mt-5 h-[fit-content] overflow-x-auto"
					>
						{isLoading ? (
							<AppLoader />
						) : (
							<SchoolsTable
								schools={schools?.payload}
								isFetching={isFetching}
								lang={lang}
								isScreenSmall={isScreenSmall}
							/>
						)}
					</div>
				</ContentTableContainer>
			)}
		</>
	);
};

export default Private(Schools);
