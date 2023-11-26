const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../models/user");
const router = express.Router();
// const catchError = require("../util/catchError");
const users = require("../controllers/user");
const user = require("../models/user");
const session = require("express-session");
const { isLogged } = require("../middlewares/auth_middleware");

const jsonParser = bodyParser.json();

router.route("/").get(jsonParser, users.home);
router.route("/loginStatus").get(jsonParser, users.loginStatus);

router.route("/register").post(jsonParser, users.register);

router.route('/fetchEmployees').get(async (req, res) => {
	try {
	  const employees = await User.find({ role: 'Employee' });
	  res.json(employees);
	} catch (error) {
	  res.status(500).json({ error: 'Error fetching employees' });
	}
  });

  // Assuming you have a route that fetches tasks for the logged-in user
  
  router.route('/fetchTasks').get(async (req, res) => {
	try {
	  // Assuming you have a 'username' property in your user object
	  console.log("req.user: ", req.user)
	  const currentUser = req.user;
	  const username = currentUser.username;
  
	  // Query the user document by username and retrieve the tasks field
	  const user = await User.findOne({ username });
  
	  if (!user) {
		return res.status(404).json({ message: 'User not found' });
	  }
  
	  // Extract tasks for the current user from the user document
	  const tasks = user.tasks;
  
	  // Return the fetched tasks as a response
	  res.json(tasks);
	} catch (error) {
	  // Handle any errors that might occur during the database query
	  console.error('Error fetching tasks:', error);
	  res.status(500).json({ message: 'Internal Server Error' });
	}
  });
  
  

  router.route("/addTask").post(async (req, res) => {
	try {
	  const { username, task } = req.body;
	  console.log("BODY: ", req.body)
  
	  // Find the user by username and update the tasks array
	  const user = await User.findOneAndUpdate(
		{ username: username },
		{ $push: { tasks: task } }, // Add the new task to the tasks array
		{ new: true } // To return the updated document
	  );

  
	  if (user) {
		res.status(200).json({ message: 'Task added successfully', user: user });
	  } else {
		res.status(404).json({ message: 'User not found' });
	  }
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: 'Server error' });
	}
  });



router.route("/login").post(
	jsonParser,
	passport.authenticate("local", {
		successRedirect: "/",
	}),
	users.login
);

router.get("/logout", jsonParser, users.logout);
module.exports = router;
