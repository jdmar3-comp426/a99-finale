// Define app using express
var express = require("express")
var app = express()
// Require database SCRIPT file
var db = require("./database.js")

// Require md5 MODULE
var md5 = require("md5")

// Require cors module
const cors = require("cors")

// Make Express use its own built-in body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make Express use CORS
app.use(cors())

// Set server port
var HTTP_PORT = 5000

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

// READ (HTTP method GET) at root endpoint /app/
app.get("/app/", (req, res, next) => {
  res.json({"message":"Your API works! (200)"});
	res.status(200);
});

// Define other CRUD API endpoints using express.js and better-sqlite3
// CREATE a new user (HTTP method POST) at endpoint /app/new/
app.post("/app/new", (req, res) => {	
	const stmt = db.prepare('INSERT INTO userinfo (user, email, pass, lastLogin, score, level, upgradeCost, clickerCost, autoClickerLevel, deanDome, deanDomeCost) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
	const info = stmt.run(req.body.user, req.body.email, md5(req.body.pass), new Date().toLocaleDateString(), 0, 1, 25, 500, 0, 0, 1000);

	// Update response json to include most recent ID and status 201
	res.json({"message": "1 record created: ID " + info.lastInsertRowid + " (201)"})
	res.status(201);
});

// READ a list of all users (HTTP method GET) at endpoint /app/users/
app.get("/app/users", (req, res) => {	
	const stmt = db.prepare("SELECT * FROM userinfo").all();
	res.status(200).json(stmt);
});

// READ a single user (HTTP method GET) at endpoint /app/user/:user
app.get("/app/user/:user", (req, res) => {	
	const stmt = db.prepare("SELECT * FROM userinfo WHERE user = ?").get(req.params.user);
	res.status(200).json(stmt);
});

// LOGIN for a single user at endpoint /app/login
app.get("/app/login/:user/:pass", (req, res) => {	
	const stmt = db.prepare("SELECT * FROM userinfo WHERE user = ? AND pass = ?");
  const userInfo = stmt.get(req.params.user, md5(req.params.pass))
  if (userInfo) {
    res.status(200).json(userInfo);
  } else {
    res.status(404).json({"message": "User not found"})
  }
});

// UPDATE a single user (HTTP method PATCH) at endpoint /app/update/user/:user
app.patch("/app/update/user/:user", (req, res) => {	
	const stmt = db.prepare('UPDATE userinfo SET user = COALESCE(?,user), email = COALESCE(?,email), pass = COALESCE(?,pass), lastLogin = COALESCE(?,lastLogin), score = COALESCE(?,score), level = COALESCE(?,level), upgradeCost = COALESCE(?,upgradeCost), clickerCost = COALESCE(?,clickerCost), autoClickerLevel = COALESCE(?,autoClickerLevel), deanDome = COALESCE(?, deanDome), deanDomeCost = COALESCE(?,deanDomeCost) WHERE user = ?');
	const info = stmt.run(req.params.user, req.body.email, req.body.pass != null ? md5(req.body.pass) : null, req.body.lastLogin, req.body.score, req.body.level, req.body.upgradeCost, req.body.clickerCost, req.body.autoClickerLevel, req.body.deanDome, req.body.deanDomeCost, req.params.user);

	// Update response json to include most recent ID and status 201
	res.json({"message":"1 record updated: USER " + req.params.user + " (200)"});
	res.status(200);
});

// DELETE a single user (HTTP method DELETE) at endpoint /app/delete/user/:user
app.delete("/app/delete/user/:user", (req, res) => {	
	const stmt = db.prepare('DELETE FROM userinfo WHERE user = ?');
	const info = stmt.run(req.params.user);
	
	// Update response json to include deleted ID and status 200
	res.json({"message":info.changes + " record deleted: USER " + req.params.user + " (200)"});
  res.status(200);
});

// Default response for any other request
app.use(function(req, res){
	res.json({"message":"Invalid request"});
  res.status(404);
});
