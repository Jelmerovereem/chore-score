import { imgInput, uploadBtn, profileImgEl } from "../utils/profileUtils.js";
import { postFetch, postExternFetch } from "../modules/fetches.js";
const cloudinaryCloudName = "dpzg6mrfx";
const cloudinaryEndpoint = `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`;

export default async function uploadImg(file) {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("upload_preset", "choreScore");
	const result = await postExternFetch(cloudinaryEndpoint, formData);
	const imgUrl = result.secure_url;
	return imgUrl;
}