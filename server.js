// require cloudinary
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// require express npm package
const express = require("express");
const session = require("express-session");

//require webpush
const webPush = require("web-push");

// require mongodb
const mongo = require("mongodb");

// body-parser for req.body
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
  extended: true
});

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;
webPush.setVapidDetails("mailto:jelmer_overeem@hotmail.com", publicVapidKey, privateVapidKey);


// init app
const app = express();

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));

app.use(express.static("static"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.get("/", renderHome);
app.get("/login", renderLogin);
app.get("/userProfile", renderProfile);
app.get("/rooms", renderRooms);
app.get("/rooms/:room", renderDetailRoom);
app.get("/signout", signout);

app.post("/checkLogin", checkLogin);
app.post("/changePic", changeProfilePic);
app.post("/saveChore", saveChore);
app.post("/sendPush", (req, res) => {
	const subscription = req.body;

	res.status(201).json({});

	const payload = JSON.stringify({
		title: "Push notifications with service workers",
	});

	webPush.sendNotification(subscription, payload).catch(err => console.error(err));
})

const url = process.env.DB_HOST + ':' + process.env.DB_PORT;

mongo.MongoClient.connect(url, (err, client) => {
	if (err) {
		console.log("Error, database connection failed");
	} else {
		console.log("database connection succeeded");
	}
	db = client.db(process.env.DB_NAME);
});

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

function signout(req, res) {
	req.session.destroy(err => err ? console.log(err) : "");
	res.redirect("/");
}

async function checkLogin(req, res) {
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

function changeProfilePic(req, res) {
	const profileImgUrl = req.body.imgUrl;

	db.collection("users").updateOne({email: req.session.user.email}, {$set: {profileImg: profileImgUrl}}, (err) => {
		if (err) console.log(err)
			else {
				req.session.user.profileImg = profileImgUrl;
				sendResponse(req, res, {status: "ok", profileImgUrl});
			}
	})
}

async function saveChore(req, res) {
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
			}
	})
}

function sendResponse(req, res, data) {
	res.setHeader("Content-Type", "application/json");
	res.send(JSON.stringify(data));
}

function createUser() {
	db.collection("users").insertOne({
		userName: "eva",
		userPassword: "hoi",
		email: "evaspoor@hotmail.com",
		household: "Rosendahl"
	}, (err) => {
		console.log(err)
	})
}

/*setTimeout(() => {
	createUser()
}, 5000)*/

app.listen(process.env.PORT || 4000, () => console.log("server is running on port 4000"));