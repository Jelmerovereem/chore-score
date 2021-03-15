import { db } from "../../server.js";

export default function addNotification(notificationObj) {
	db.collection("notifications").insertOne(notificationObj);
}