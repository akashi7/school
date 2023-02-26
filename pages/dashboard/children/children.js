import React from "react";
import ContentNavbar from "../../../components/Shared/ContentNavbar";
import Private from "../../../components/Routes/Private";
import {
	AppLoader,
	GeneralContentLoader,
} from "../../../components/Shared/Loaders";
import { _pagination_number_ } from "../../../config/constants";
import ContentTableContainer from "../../../components/Shared/ContentTableContainer";
import ChildrenTable from "../../../components/Tables/ChildrenTable";
import { useGetChildrenQuery } from "../../../lib/api/Parent/childrenEndpoints";
import { useSelector } from "react-redux";

const Children = () => {
	const { data: children, isLoading, isFetching } = useGetChildrenQuery();

	const isPageLoading = isLoading;

	const lang = useSelector((state) => state?.translation?.payload);

	const LeftSide = () => (
		<p className="text-[20px] text-dark font-semibold">
			{children?.payload?.length || ""} {lang?.children_pg?.title}
		</p>
	);

	return (
		<>
			<ContentNavbar left={<LeftSide />} />

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
							<ChildrenTable
								data={children?.payload}
								isFetching={isFetching}
								lang={lang}
							/>
						)}
					</div>
				</ContentTableContainer>
			)}
		</>
	);
};

export default Private(Children);
