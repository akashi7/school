import React from "react";
import Pagination from "antd/lib/pagination";
import PropTypes from "prop-types";
import { _pagination_number_ } from "../../config/constants";

const Paginator = ({
	total = 0,
	setCurrentPage = () => null,
	pageSize = _pagination_number_,
	totalPages,
}) => {
	const onChange = (page) => {
		setCurrentPage(page - 1);
	};

	return (
		totalPages > 1 && (
			<div className="grid justify-end mt-[32px]  w-[100%]">
				<Pagination
					onChange={onChange}
					showSizeChanger={false}
					defaultCurrent={1}
					total={total}
					pageSize={pageSize}
				/>
			</div>
		)
	);
};

Paginator.propTypes = {
	setCurrentPage: PropTypes.func,
};

export default Paginator;
