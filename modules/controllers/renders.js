import { db } from "../../server.js";

async function renderHome(req, res) {
	if (!req.session.user) {
		res.redirect("/login")
	} else {
		const allUsers = await db.collection("users").find().toArray();
		const householdUsers = allUsers.filter(obj => obj.household === req.session.user.household);
		res.render("score.ejs", {
			userData: req.session.user,
			householdUsers,
			page_name: "score"
		});
	}
}

function renderLogin(req, res) {
	if (!req.session.user) {
		res.render("login.ejs");
	} else {
		res.redirect("/");
	}
}

function renderProfile(req, res) {
	if (!req.session.user) {
		res.redirect("/login");
	} else {
		res.render("userProfile.ejs", {
			userData: req.session.user,
			page_name: "userProfile"
		})
	}
}

async function renderRooms(req, res) {
	if (!req.session.user) {
		res.redirect("/login");
	} else {
		const household = await db.collection("household-chores").findOne({household: req.session.user.household});
		res.render("rooms.ejs", {
			userData: req.session.user,
			page_name: "trackChore",
			household
		})
	}
}

async function renderDetailRoom(req, res) {
	if (!req.session.user) {
		res.redirect("/login");
	} else {
		const givenParam = req.params.room;
		const household = await db.collection("household-chores").findOne({household: req.session.user.household});
		const room = household.rooms.find(obj => obj.room === givenParam);
		res.render("detailRoom.ejs", {
			userData: req.session.user,
			page_name: "trackChore",
			room
		})
	}
}

async function renderNotifications(req, res) {
	if (!req.session.user) {
		res.redirect("/login");
	} else {
		const notifications = await db.collection("notifications").find().toArray();

		res.render("notifications.ejs", {
			userData: req.session.user,
			page_name: "Notifications",
			notifications
		});
	}
}

function signout(req, res) {
	req.session.destroy(err => err ? console.log(err) : "");
	res.redirect("/");
}


export { renderHome, renderLogin, renderProfile, renderRooms, renderDetailRoom, renderNotifications, signout };