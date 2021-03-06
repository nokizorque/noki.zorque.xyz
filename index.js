/* 
 * zmgr: Manage noki.zorque.xyz web services
 * 
 * DEVELOPERS: Lewis Watson
 * DATE: 17.06.2018
 * PURPOSE: Serve as the application entry point
 * FILE: index.js
 */

"use strict";

/*
 * Node environment
 */
require("dotenv").config();
if (!process.env.NODE_ENV) {
	process.env.NODE_ENV = "dev";
}
console.log("You are running in " + process.env.NODE_ENV + " environment");

/*
 * Configuration
 */
const port = process.env.PORT || 3000;

/*
 * Libraries
 */
const pug = require("pug");
const express = require("express");
const session = require("express-session");
const favicon = require("serve-favicon");

/*
 * Express
 */
const app = module.exports = express();
app.use(session({
	secret: process.env.SECRET,
	saveUninitialized: false,
	resave: false
}));
app.engine("pug", pug.__express);
app.set("view engine", "pug");
app.use("/i", express.static(process.env.WORKING_DIR + "/i")); // serve images
app.use("/u", express.static(process.env.WORKING_DIR + "/u")); // service files
app.use("/assets", express.static("assets"));
app.use(favicon(__dirname + "/assets/img/favicon.ico"));

/*
 * Middleware
 */
app.use(require("./logic/middleware.js"));

/*
 * Routes
 */
require("./logic/routes.js");

/*
 * Listen
 */
app.listen(port, () => {
	console.log("Listening for incoming connections on port " + port);
});
