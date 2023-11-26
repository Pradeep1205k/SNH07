import React, { useState } from "react";
import { Link, json, useNavigate } from "react-router-dom";

export default function Login() {
	const navigate = useNavigate();
	const [thisUser, setThisUser] = useState({});
	const [role, setRole] = useState("")

	const handleInputChange = (e) => {
		console.log(e);
		setThisUser({ ...thisUser, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("ThisUSERRR",thisUser)
		const username = thisUser.username;
		const password = thisUser.password;
		const role = thisUser.role
		setRole(()=> role)
		console.log("rolee ",role)

		fetch("http://localhost:5000/login", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		})
			.then((response) => {
				console.log(response);
				if (response.status == 200 ) {
					console.log(role)
					if(role === "Employer"){
						navigate("/");
					}
					else {
						navigate("/slaveHome");
					}
				} else {
					console.log("User Not Found");
				}
			})
			
			  
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<>
			<div className="flex justify-center items-center h-screen w-screen font-body bg-indigo-200  bg-cover bg-center ">
				<div className="border-2 rounded-md shadow-sm px-12 pt-12 bg-white flex flex-col">
					<h1 className="mb-10 text-3xl font-semibold self-center text-indigo-400">
						Login
					</h1>
					<form onSubmit={handleSubmit} className="flex flex-col ">
						<label className="text-md" htmlFor="username">
							Username:
						</label>
						<input
							className="mb-4 mt-2 border rounded-sm h-8 w-64"
							type="text"
							name="username"
							id="username"
							onChange={handleInputChange}
							required
						/>
						<label className="text-md" htmlFor="password">
							Password:
						</label>
						<input
							className="mb-4 mt-2 border rounded-sm h-8 w-64"
							type="password"
							name="password"
							id="password"
							onChange={handleInputChange}
							required
						/>
						<label className="text-md" htmlFor="username">
							Select your role:
						</label>
						<span className="mb-4">
						<span><input type="radio" onChange={handleInputChange} name="role" id="role1" value="Employee" className="mr-1 cursor-pointer"/><label className="mr-8 cursor-pointer" htmlFor="role1">Employee</label></span>
						<span><input type="radio" onChange={handleInputChange} name="role" id="role2" value="Employer" className="mr-1 cursor-pointer" /><label htmlFor="role2" className=" cursor-pointer">Employer</label></span></span>
						<label className="text-md" htmlFor="username">
							Enter secret ID:
						</label>
						<input
							className="mb-4 mt-2 border rounded-sm h-8 w-64"
							type="text"
							name="secret"
							id="secret"
							onChange={handleInputChange}
							required
						/>
						<button className="mt-4 py-1 w-24  text-lg border text-indigo-400 rounded-md self-center hover:text-primary-300 hover:bg-white hover:shadow-sm font-bold ">
							Login
						</button>
						<p className="self-center mt-7 mb-7">
							Don't have an account?{" "}
							<Link
								to="/register"
								className="cursor-pointer text-indigo-400 font-bold"
							>
								Register
							</Link>
						</p>
					</form>
				</div>
			</div>
		</>
	);
}
