import React, { useState } from "react";
import Form from "antd/lib/form";
import ContentNavbar from "../../../components/Shared/ContentNavbar";
import CustomButton from "../../../components/Shared/CustomButton";
import ClassProfile from "./ClassProfile";
import SingleClass from "../../../components/SingleClass";
import CustomModal from "../../../components/Shared/CustomModal";
import CustomInput from "../../../components/Shared/CustomInput";
import Private from "../../../components/Routes/Private";
import {
	useAddClassMutation,
	useGetClassesQuery,
} from "../../../lib/api/Classrooms/classroomsEndpoints";
import {
	AppLoader,
	GeneralContentLoader,
} from "../../../components/Shared/Loaders";
import requiredField from "../../../helpers/requiredField";
import handleAPIRequests from "../../../helpers/handleAPIRequests";
import { Empty } from "../../../components/Shared/Empty";
import Paginator from "../../../components/Shared/Paginator";
import { _pagination_number_ } from "../../../config/constants";

const Classes = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [visibleClass, setVisibleClass] = useState(null);
	const [currentPage, setCurrentPage] = useState(0);
	const [search, setSearch] = useState("");

	const {
		data: classes,
		isLoading,
		isFetching,
	} = useGetClassesQuery({
		page: currentPage,
		size: _pagination_number_,
		search,
	});
	const [addClass, { isLoading: isAddingClass }] = useAddClassMutation();

	const [form] = Form.useForm();

	const onSuccess = () => {
		setIsVisible(false);
		setCurrentPage(0);
		setSearch("");
		form.resetFields();
	};

	const onAddClassFinish = (values) => {
		handleAPIRequests({
			request: addClass,
			onSuccess: onSuccess,
			notify: true,
			...values,
		});
	};

	const onSearchChange = (value) => {
		setSearch(value);
		setCurrentPage(0);
	};

	const showEmpty = classes?.payload?.totalItems <= 0;

	const RightSide = () => (
		<CustomButton onClick={() => setIsVisible(true)} type="primary">
			New class
		</CustomButton>
	);

	const LeftSide = () => (
		<p className="text-[20px] text-dark font-semibold">
			{classes?.payload?.items?.length || ""} Classrooms
		</p>
	);

	return (
		<div>
			<CustomModal
				isVisible={isVisible}
				setIsVisible={setIsVisible}
				loading={isAddingClass}
				title="Create class"
				footerContent={
					<CustomButton
						loading={isAddingClass}
						type="primary"
						htmlType="submit"
						form="add-class"
					>
						Save
					</CustomButton>
				}
			>
				<Form form={form} name="add-class" onFinish={onAddClassFinish}>
					<CustomInput
						label="Class name"
						placeholder="Class name..."
						name="name"
						rules={requiredField("Class name")}
					/>
				</Form>
			</CustomModal>

			<ContentNavbar left={<LeftSide />} right={<RightSide />} />

			{/* Content */}
			{isLoading ? (
				<GeneralContentLoader />
			) : (
				<div className="flex gap-4 mt-8 h-[73vh] overflow-y-hidden">
					<div
						className={`w-[55%] ${
							showEmpty && "flex items-center"
						} h-[73vh] overflow-y-auto mr-12`}
					>
						{showEmpty ? (
							<Empty className="mt-6" height="72vh" />
						) : (
							<>
								<div className="w-[350px] mb-8">
									<CustomInput
										onChange={onSearchChange}
										placeholder="type to search..."
									/>
								</div>
								{isFetching ? (
									<AppLoader className="h-[60vh]" />
								) : (
									classes?.payload?.items.map((item, index) => (
										<SingleClass
											key={item?.id}
											visibleClass={visibleClass}
											setVisibleClass={setVisibleClass}
											setSearch={setSearch}
											setCurrentPage={setCurrentPage}
											data={item}
											index={index + 1}
										/>
									))
								)}
							</>
						)}

						<Paginator
							total={classes?.payload?.totalItems}
							setCurrentPage={setCurrentPage}
							totalPages={classes?.payload?.totalPages}
						/>
					</div>

					<div className="w-[45%]">
						<ClassProfile visibleClass={visibleClass} />
					</div>
				</div>
			)}
		</div>
	);
};

export default Private(Classes);
