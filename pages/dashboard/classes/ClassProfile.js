import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Form from "antd/lib/form";
import CustomImage from "../../../components/Shared/CustomImage";
import SingleStream from "../../../components/SingleStream";
import CustomButton from "../../../components/Shared/CustomButton";
import CustomInput from "../../../components/Shared/CustomInput";
import CustomModal from "../../../components/Shared/CustomModal";
import {
	useAddStreamMutation,
	useLazyGetStreamsQuery,
} from "../../../lib/api/Classrooms/classroomsEndpoints";
import handleAPIRequests from "../../../helpers/handleAPIRequests";
import {
	AppLoader,
	GeneralContentLoader,
} from "../../../components/Shared/Loaders";
import requiredField from "../../../helpers/requiredField";
import { Empty } from "../../../components/Shared/Empty";

const ClassProfile = ({ visibleClass }) => {
	const [isVisible, setIsVisible] = useState(false);

	const [getStreams, { isFetching, isLoading, data: streams }] =
		useLazyGetStreamsQuery();
	const [addStream, { isLoading: isAddingStream }] = useAddStreamMutation();

	const [form] = Form.useForm();

	const onSuccess = () => {
		form.resetFields();
		setIsVisible(false);
	};

	const onAddStreamFinish = (values) => {
		handleAPIRequests({
			request: addStream,
			notify: true,
			id: visibleClass?.id,
			...values,
			onSuccess: onSuccess,
		});
	};

	useEffect(() => {
		if (visibleClass?.id) {
			handleAPIRequests({
				request: getStreams,
				id: visibleClass?.id,
			});
		}
	}, [getStreams, visibleClass]);

	return (
		<>
			<CustomModal
				isVisible={isVisible}
				setIsVisible={setIsVisible}
				loading={isAddingStream}
				title="Add stream"
				footerContent={
					<CustomButton
						type="primary"
						htmlType="submit"
						form="add-stream"
						loading={isAddingStream}
					>
						Save
					</CustomButton>
				}
				subTitle="For class"
				subTitleKey={visibleClass?.name}
			>
				<Form form={form} name="add-stream" onFinish={onAddStreamFinish}>
					<CustomInput
						label="Stream name"
						placeholder="Stream name..."
						name="name"
						rules={requiredField("Stream name")}
					/>
				</Form>
			</CustomModal>

			<div className="w-[100%] bg-white p-8 py-4 rounded-md">
				{!visibleClass ? (
					<Empty
						message="Please select a class to view details!"
						className="mt-6"
						height="73vh"
					/>
				) : isLoading ? (
					<GeneralContentLoader />
				) : (
					<>
						<h1 className="text-dark font-semibold mb-12 border-b pb-4 text-[32px]">
							{visibleClass?.name}
						</h1>

						<div className="flex justify-between items-center bg-grey p-4 py-2 rounded-md mb-4">
							<p className="text-[20px] text-dark font-semibold">
								{streams?.payload?.totalItems} Streams
							</p>

							<CustomImage
								onClick={() => setIsVisible(true)}
								src="/icons/add_stream.svg"
								className="cursor-pointer"
							/>
						</div>

						<div className="h-[50vh] overflow-y-auto">
							{isFetching ? (
								<AppLoader height="45vh" className="mt-6" />
							) : streams?.payload?.totalItems <= 0 ? (
								<Empty className="mt-6" height="45vh" />
							) : (
								streams?.payload?.items?.map((stream, index) => (
									<SingleStream
										key={stream.id}
										data={stream}
										index={index + 1}
										visibleClass={visibleClass}
									/>
								))
							)}
						</div>
					</>
				)}
			</div>
		</>
	);
};

ClassProfile.propTypes = {
	visibleClass: PropTypes.any,
};

export default ClassProfile;
