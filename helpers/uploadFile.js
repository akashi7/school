import { BlobServiceClient } from "@azure/storage-blob";
const uploadFile = async ({
	files = [],
	setUploadLoading = () => null,
	setUploadSuccess = () => null,
	setUploadFailure = () => null,
	setImgURL = () => null,
}) => {
	const CLAUD_NAME = process.env.NEXT_PUBLIC_CLAUDINARY_CLAUD_NAME;
	const PRESET = process.env.NEXT_PUBLIC_CLAUDINARY_PRESET;

	setUploadLoading(true);

	const blobServiceClient = new BlobServiceClient(`https://schoolneststorage.blob.core.windows.net/?w/+7bnGrD2HeTOJZiO5StyJ9L0tCHT1CDyUL7bghxWJtD5r+RiSrLQeCwmwzH9zI4YVOGI9D3ga9+AStQyu/zw==`
	);

	const containerClient = blobServiceClient.getContainerClient("schoolnest-pay-container");
	// await containerClient.createIfNotExists({
	// 	access:"container"
	// })
	const blobClient = containerClient.getBlockBlobClient(files[0].name)
  const result = await blobClient.uploadFile(files[0]); 

	console.log({result})
	

	const formData = new FormData();
	formData.append("file", files[0]);
	formData.append("upload_preset", PRESET);

	// fetch(`https://api.cloudinary.com/v1_1/${CLAUD_NAME}/image/upload`, {
	// 	method: "POST",
	// 	body: formData,
	// })
	// 	.then((res) => res.json())
	// 	.then((res) => {
	// 		setUploadLoading(false);
	// 		setUploadFailure(false);
	// 		setUploadSuccess(true);
	// 		setImgURL(res?.secure_url);
	// 	})
	// 	.catch(() => {
	// 		setUploadLoading(false);
	// 		setUploadFailure(true);
	// 		setUploadSuccess(false);
	// 		setImgURL(null);
	// 	});
};

export default uploadFile;
