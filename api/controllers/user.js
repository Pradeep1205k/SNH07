const User = require("../models/user");

const register = async (req, res) => {
	try {
	  console.log(req.body);
	  const { username, email, password, role } = req.body.thisUser; // Extract 'role' from the request body
	  const user = new User({ email, username, role }); // Include 'role' in the user creation
	  const registeredUser = await User.register(user, password);
	  req.login(registeredUser, (err) => {
		if (err) return next(err);
		console.log('Registered successfully');
		res.send('Registered successfully');
	  });
	  
	} catch (e) {
	  console.log('error ' + e);	
	}
  };
  
//   const fetchEmployees = async () => {
// 	try {
// 	  const employees = await User.find({ role: 'Employee' }); // Fetch users with role 'Employee'
// 	  return employees;
// 	} catch (error) {
// 	  // Handle error if fetching fails
// 	  console.error('Error fetching employees:', error);
// 	  throw new Error('Error fetching employees');
// 	}
//   };


const login = async (req, res) => {
	try {
		console.log(req.user);
		res.status(200).json({ role: user.role });
	} catch (e) {
		console.log(e);
	}
};

const logout = async (req, res) => {
	try {
		req.logout(() => {
			console.log("logged out");
			res.send("logged out");
		});
	} catch (e) {
		console.log("Cannot Log out ", e);
	}
};

const home = async (req, res) => {
	console.log("User is currently logged in: " + req.user);
	res.send("User is currently logged in: " + req.user);
};

const loginStatus = async (req, res) => {
	console.log(req.isAuthenticated());
	res.send(req.isAuthenticated());
};

module.exports = { register, login, logout, loginStatus, home };
