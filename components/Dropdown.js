import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-/icons/fi";

function Dropdown({ selected, setSelected, options }) {
	const [isActive, setIsActive] = useState(false);
	return (
		<div className="dropdown">
			<div onClick={() => setIsActive(!isActive)} className="dropdown-btn">
				<div>{selected !== "" ? selected : "Choose One"}</div>
				<div className="dropdown__arrow">
					{isActive ? (
						<FiChevronUp color="black" />
					) : (
						<FiChevronDown color="black" />
					)}
				</div>
			</div>
			{isActive && (
				<div className="dropdown-content">
					{options.map((item) => (
						<div
							key={item}
							onClick={() => {
								setSelected(item);
								setIsActive(false);
							}}
							className="dropdown-item"
						>
							{item}
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default Dropdown;
