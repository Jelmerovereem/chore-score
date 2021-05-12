import sendResponse from "./helpers/sendResponse.js";
import addNotification from "./helpers/addNotification.js";
import { db } from "../server.js";

export default async function saveChore(req, res) {
	const myUserData = await db.collection("users").findOne({email: req.session.user.email});
	const finishedChoresArray = myUserData.finishedChores;
	const choreDate = req.body.dateAndTime.split("T")[0];
	let todaysObject = finishedChoresArray.find(obj => obj.date === choreDate);
	if (todaysObject === undefined) {
		let todaysChores = [];
		todaysChores.push(req.body);
		let todaysObj = {
			date: choreDate,
			todaysChores
		}
		finishedChoresArray.push(todaysObj)
	} else {
		todaysObject.todaysChores.push(req.body);
		let choresObjIndex = finishedChoresArray.findIndex((obj => obj.date === choreDate));
		finishedChoresArray[choresObjIndex].todaysChores = todaysObject.todaysChores;
	};
	db.collection("users").updateOne({email: req.session.user.email}, {$set: {finishedChores: finishedChoresArray}}, (err) => {
		if (err) console.log(err)
			else {
				sendResponse(req, res, {status: "ok"});
				let now = new Date();
				let notificationDateTime = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}T${now.getHours()}-${now.getMinutes()<10?"0":""}${now.getMinutes()}`;
				let randomId = () => Math.floor(Math.random()* 9999);
				let notificationObj = {
					id: randomId(),
					notificationDateTime,
					mainUser: req.session.user.userName,
					household: req.session.user.household,
					type: "added-chore",
					choreDateTime: req.body.dateAndTime,
					chore: req.body
				}
				addNotification(notificationObj);
			}
	})
}