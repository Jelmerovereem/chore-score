import sendResponse from "./helpers/sendResponse.js";
import { db } from "../server.js";

export default function changeProfilePic(req, res) {
	const profileImgUrl = req.body.imgUrl;

	db.collection("users").updateOne({email: req.session.user.email}, {$set: {profileImg: profileImgUrl}}, (err) => {
		if (err) console.log(err)
			else {
				req.session.user.profileImg = profileImgUrl;
				sendResponse(req, res, {status: "ok", profileImgUrl});
			}
	})
}