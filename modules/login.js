import sendResponse from "./helpers/sendResponse.js";
import { db } from "../server.js";
 
export default async function checkLogin(req, res) {
	const allUsers = await db.collection("users").find().toArray();
	const userObj = allUsers.find(obj => obj.userName === req.body.userName.toLowerCase()); // find user
	if (userObj) {
		if (userObj.userPassword === req.body.userPassword) { // user found and password is right
			let data = {
				status: "ok"
			}
			req.session.user = userObj;
			res.setHeader("Content-Type", "application/json");
			res.send(JSON.stringify(data));
		} else { // user found but password not right
			let data = {
				status: "notok",
				message: "Wachtwoord is onjuist."
			}
			sendResponse(req, res, data)
		}
	} else { // user not found
		let data = {
			status: "notok",
			message: "Gebruiker niet gevonden"
		}
		sendResponse(req, res, data)
	}
}