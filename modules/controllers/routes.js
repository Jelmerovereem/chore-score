import { app } from "../../server.js"
import { renderHome, renderLogin, renderProfile, renderRooms, renderDetailRoom, renderNotifications, signout } from "./renders.js";

export default function routes() {
	app
		.get("/", renderHome)
		.get("/login", renderLogin)
		.get("/userProfile", renderProfile)
		.get("/rooms", renderRooms)
		.get("/rooms/:room", renderDetailRoom)
		.get("/notifications", renderNotifications)
		.get("/signout", signout);
}

//module.exports = routes();
//exports.routes = routes();