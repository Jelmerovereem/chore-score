import { imgInput, uploadBtn, profileImgEl } from "../utils/profileUtils.js";
import { postFetch, postExternFetch } from "../modules/fetches.js";
const cloudinaryCloudName = "dpzg6mrfx";
const cloudinaryEndpoint = `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`;

export default async function changePic() {
	console.log("hi clicked")
	console.log(imgInput.files[0]);
	const formData = new FormData();
	formData.append("file", imgInput.files[0]);
	formData.append("upload_preset", "choreScore");
	const result = await postExternFetch(cloudinaryEndpoint, formData);
	const imgUrl = result.secure_url;
	console.log(imgUrl)
	const uploadedImage = await postFetch("/changePic", JSON.stringify({imgUrl}));
	console.log(uploadedImage);
	uploadedImage.status === "ok" ? window.location.reload() : console.err("Niet gelukt");
}