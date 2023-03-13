export const AppLoader = ({ height, className }) => {
	return (
		<div
			className={`${className} ${
				height ? `h-[${height}]` : "h-[100vh]"
			} w-[100%] flex items-center justify-center`}
		>
			<div className="lds-ripple m-auto">
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export const GeneralContentLoader = () => {
	return (
		<div className="w-[100%] h-[70vh] flex items-center justify-center">
			<div className="lds-ripple m-auto">
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export const BeingPromotedLoader = () => {
	return (
		<div className="bg-[rgba(255,255,255,0.8)] h-[100%] w-[100%] absolute top-0 left-0 z-10 grid justify-center items-center">
			<div className="lds-ripple m-auto">
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export const MobileTableLoader = ({ className }) => {
	return (
		<div
			className={`${className} bg-[rgba(255,255,255,0.8)] h-[100%] w-[100%] absolute top-0 left-0 z-10 grid justify-center items-center`}
		>
			<div className="lds-ripple m-auto">
				<div></div>
				<div></div>
			</div>
		</div>
	);
};
