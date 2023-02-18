const uploadFile = ({
	files = [],
	setUploadLoading = () => null,
	setUploadSuccess = () => null,
	setUploadFailure = () => null,
	setImgURL = () => null,
}) => {
	const CLAUD_NAME = process.env.NEXT_PUBLIC_CLAUDINARY_CLAUD_NAME;
	const PRESET = process.env.NEXT_PUBLIC_CLAUDINARY_PRESET;

	setUploadLoading(true);

	const formData = new FormData();
	formData.append("file", files[0]);
	formData.append("upload_preset", PRESET);

	fetch(`https://api.cloudinary.com/v1_1/${CLAUD_NAME}/image/upload`, {
		method: "POST",
		body: formData,
	})
		.then((res) => res.json())
		.then((res) => {
			setUploadLoading(false);
			setUploadFailure(false);
			setUploadSuccess(true);
			setImgURL(res?.secure_url);
		})
		.catch(() => {
			setUploadLoading(false);
			setUploadFailure(true);
			setUploadSuccess(false);
			setImgURL(null);
		});
};

export default uploadFile;
