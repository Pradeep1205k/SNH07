import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
	const [thisUser, setThisUser] = useState({});
	const navigate = useNavigate();
	const handleInputChange = (e) => {
		setThisUser({ ...thisUser, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		fetch("http://localhost:5000/register", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ thisUser }),
		})
			.then((response) => {
				console.log(response);

				navigate("/login");
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<>
			<div className="flex justify-center items-center h-screen w-screen font-body bg-indigo-200">
				<div className="border-2 rounded-md shadow-sm px-12 pt-12 bg-white flex flex-col">
					<h1 className="mb-10 text-3xl font-semibold self-center text-indigo-400">
						Register
					</h1>
					<form onSubmit={handleSubmit} className="flex flex-col ">
						<label className="text-md" htmlFor="username">
							Username:
						</label>
						<input
							className="mb-4 mt-2 border rounded-sm h-8 w-64 px-1"
							type="text"
							name="username"
							id="username"
							onChange={handleInputChange}
							required
						/>
						<label className="text-md" htmlFor="email">
							Email:
						</label>
						<input
							className="mb-4 mt-2 border rounded-sm h-8 w-64 px-1"
							type="email"
							name="email"
							id="email"
							onChange={handleInputChange}
							required
						/>
						<label className="text-md" htmlFor="password">
							Password:
						</label>
						<input
							className="mb-4 mt-2 border rounded-sm h-8 w-64 px-1"
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
						<button className="mt-4 py-1 w-24 text-indigo-400 text-xl border border-indigo-400 rounded-md self-center">
							Register
						</button>
						<p className="self-center mt-7 mb-7">
							Have an account already?{" "}
							<Link
								to="/login"
								className="cursor-pointer text-indigo-400 font-bold"
							>
								Login
							</Link>
						</p>
					</form>
				</div>
			</div>
		</>
	);
}
