// require cloudinary
//const cloudinary = require("cloudinary").v2;
import v2 from "cloudinary";
//console.log(cloudinary)


import dotenv from "dotenv";
dotenv.config()
//require("dotenv").config();

// require express npm package
//const express = require("express");
//const session = require("express-session");
import express from "express";
import session from "express-session";

//require webpush
//const webPush = require("web-push");
import webPush from "web-push";

// require mongodb
//const mongo = require("mongodb");
import {default as mongo} from "mongodb";

// body-parser for req.body
//const bodyParser = require('body-parser');
import bodyParser from "body-parser";
const urlencodedParser = bodyParser.urlencoded({
  extended: true
});

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;
webPush.setVapidDetails("mailto:jelmer_overeem@hotmail.com", publicVapidKey, privateVapidKey);


// init app
export const app = express();

import routes from "./modules/controllers/routes.js";
import checkLogin from "./modules/login.js";
import changeProfilePic from "./modules/changeProfilePic.js"
import saveChore from "./modules/saveChore.js";
import createUser from "./modules/createUser.js";
import addNotification from "./modules/helpers/addNotification.js";
import getNotifications from "./modules/getNotifications.js";

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true
}));

app.use(express.static("static"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("view engine", "ejs");

routes();

app.get("/getNotifications", getNotifications);
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

export let db;

mongo.MongoClient.connect(url, (err, client) => {
	if (err) {
		console.log("Error, database connection failed");
	} else {
		console.log("database connection succeeded");
	}
	db = client.db(process.env.DB_NAME);
});

app.listen(process.env.PORT || 4000, () => console.log("server is running on port 4000"));