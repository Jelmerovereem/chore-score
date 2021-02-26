import { imgInput, uploadBtn } from "../utils/profileUtils.js";
import { postFetch } from "../modules/fetches.js";
const cloudinaryCloudName = "dpzg6mrfx";
const cloudinaryEndpoint = `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`;

export default function changePic() {
	console.log("hi clicked")
	console.log(imgInput.files[0]);
	let data = {
		"file": imgInput.files[0],
		"upload_preset": "choreScore"
	}
	postFetch(cloudinaryEndpoint, data)
	.then(result => {
		console.log(result)
	})
}