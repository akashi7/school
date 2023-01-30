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
