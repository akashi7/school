import CustomImage from "./CustomImage";

export const Empty = ({ className, height, message }) => (
	<div
		className={`${className} ${
			height ? `h-[${height}]` : "h-[73vh]"
		} w-[100%]  flex items-center justify-center`}
	>
		<div className="flex flex-col items-center m-auto">
			<CustomImage
				src="/icons/empty.svg"
				width={90}
				className="opacity-20 mb-[-12px]"
			/>
			<span className="opacity-50 font-medium text-[16px] max-w-[200px] text-center">
				{message || "No data!"}
			</span>
		</div>
	</div>
);
