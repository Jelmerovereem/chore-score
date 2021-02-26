// require cloudinary
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// require express npm package
const express = require("express");
const session = require("express-session");

// require mongodb
const mongo = require("mongodb");

// body-parser for req.body
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
  extended: true
});


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

app.post("/checkLogin", checkLogin);

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
	console.log(req.session)
	if (!req.session.user) {
		res.redirect("/login")
	} else {
		const allUsers = await db.collection("users").find().toArray();
		const householdUsers = allUsers.filter(obj => obj.household === req.session.user.household);
		console.log(householdUsers)
		res.render("score.ejs", {
			userData: req.session.user,
			householdUsers,
			page_name: "score"
		});
	}
}

function renderLogin(req, res) {
	console.log(req.session)
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

async function checkLogin(req, res) {
	const allUsers = await db.collection("users").find().toArray();
	const userObj = allUsers.find(obj => obj.userName === req.body.userName.toLowerCase()); // find user
	if (userObj) {
		if (userObj.userPassword === req.body.userPassword) { // user found and password is right
			let data = {
				status: "ok"
			}
			req.session.user = userObj;
			console.log(req.session)
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