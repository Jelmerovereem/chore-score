import { db } from "../server.js";

export default async function getNotifications(req, res) {
	const household = req.session.user.household;
	const user = req.session.user.userName;
	
	res.setHeader("Content-Type", "application/json");
	try {
		const notifications = await db.collection("notifications").find({"household": household})
		.toArray()
		.then(items => items);
		console.log(notifications)
		res.send({status: "ok", notifications});
	} catch(error) {
		console.error(error);
		res.send({status: "notok", msg: error})
	}
}