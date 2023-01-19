import React, { useState } from "react";
import CustomButton from "./Shared/CustomButton";
import CustomInput from "./Shared/CustomInput";
import CustomModal from "./Shared/CustomModal";
import WarningModal from "./Shared/WarningModal";

const SingleStream = ({ data }) => {
	const [isVisible, setIsVisible] = useState(false);
	const [isWarningVisible, setIsWarningVisible] = useState(false);

	return (
		<>
			<CustomModal
				isVisible={isVisible}
				setIsVisible={setIsVisible}
				title="Edit stream"
				footerContent={<CustomButton type="primary">Save</CustomButton>}
				subTitle="For class"
				subTitleKey="S3"
			>
				<CustomInput label="Stream name" placeholder="Stream name.." />
			</CustomModal>

			<WarningModal
				isVisible={isWarningVisible}
				setIsVisible={setIsWarningVisible}
				warningMessage="Do you really want to delete stream"
				warningKey="A"
			/>

			<div className="flex bg-white shadow-sm p-4 items-center rounded-sm mb-4">
				<div className="flex gap-12">
					<p className="text-semi_grey">{data.id + 1}.</p>
					<p className="text-dark">{data.name}</p>
				</div>

				<div className="flex gap-12">
					<CustomButton type="edit" onClick={() => setIsVisible(true)}>
						Edit
					</CustomButton>

					<CustomButton type="delete" onClick={() => setIsWarningVisible(true)}>
						Delete
					</CustomButton>
				</div>
			</div>
		</>
	);
};

export default SingleStream;
