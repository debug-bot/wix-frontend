import { useContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import { Link } from "react-router-dom";

function Navbar() {
	const [profile, setProfile] = useState("");
	const { user, logoutUser } = useContext(AuthContext);
	const api = useAxios();
	const token = localStorage.getItem("authTokens");

	if (token) {
		const decoded = jwt_decode(token);
		var user_id = decoded.user_id;
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get("/user/profile/");
				setProfile(response.data);
			} catch (error) {
				console.log(error);
				setProfile("Something went wrong");
			}
		};
		fetchData();
	}, []);

	return (
		<div style={{ paddingBottom: "50px" }} className="navbar-contsd">
			<nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
				<div class="container-fluid">
					<a class="navbar-brand" href="#">
						WIX
					</a>
					<button
						class="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarText">
						<ul class="navbar-nav me-auto mb-2 mb-lg-0">
							{token === null && (
								<>
									<li class="nav-item">
										<Link class="nav-link" to="/login">
											Login
										</Link>
									</li>
									<li class="nav-item">
										<Link class="nav-link" to="/register">
											Register
										</Link>
									</li>
								</>
							)}

							{token !== null && (
								<>
									<li class="nav-item">
										<Link class="nav-link" to="/dashboard">
											Dashboard
										</Link>
									</li>
									<li class="nav-item">
										<a
											class="nav-link"
											onClick={logoutUser}
											style={{ cursor: "pointer" }}
										>
											Logout
										</a>
									</li>
								</>
							)}
						</ul>
						<span class="navbar-text">
							{token !== null && (
								<>
									<span className="text-white me-2">
										{profile.name}
									</span>
								</>
							)}
						</span>
					</div>
				</div>
			</nav>
		</div>
	);
}

export default Navbar;
