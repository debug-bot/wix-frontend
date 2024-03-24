import { useEffect, useState, useContext } from "react";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import { useRouter } from 'next/router';

const DashboardInfo = ({ toggleSidebar }) => {
	const [profile, setProfile] = useState("");
	const [isLoading, setIsLoading] = useState(true); // Added loading state
	const { user, logoutUser } = useContext(AuthContext);
	const api = useAxios();
	const router = useRouter();

	useEffect(() => {
		if (user) {
			const fetchData = async () => {
				try {
					const response = await api.get("/account/profile/");
					setProfile(response.data);
					console.log(response.data);
					setIsLoading(false); // Data loaded, set loading to false
				} catch (error) {
					console.log(error);
					setProfile("Something went wrong");
					setIsLoading(false); // Error occurred, set loading to false
				}
			};
			fetchData();
		} else {
			setIsLoading(false); // User not found, set loading to false
		}
	}, [user]);

	useEffect(() => {
		if (!isLoading && !user) {
			// If not loading and user is not found, redirect to the login page
			router.push("/login");
		}
	}, [isLoading, user, router]);

	if (isLoading) {
		return <div>Loading...</div>; // Or any other loading indicator
	}

	return (
		<>
			<nav class="navbar navbar-expand-md navbar-light bg-light">
				<div class="container-fluid">
					<div class="d-flex justify-content-between d-md-none d-block">
						<button
							class="btn px-1 py-0 open-btn me-2"
							onClick={toggleSidebar}
						>
							<i class="fa-solid fa-stream"></i>
						</button>
						<a class="navbar-brand navb-text fs-4" href="#">
							<span class="bg-dark rounded px-2 py-0 text-white">
								<img
									className="img-fluid"
									width="50px"
									style={{ cursor: "pointer" }}
									src="./logos/mylogo.png"
									alt="..."
								/>
							</span>
						</a>
					</div>
					<button
						class="navbar-toggler p-0 border-0"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<i class="fa-solid fa-bars"></i>
					</button>
					<div
						class="collapse navbar-collapse justify-content-between"
						id="navbarSupportedContent"
					>
						<span className="navbar-text">
							{user && profile.name}
						</span>
						<span className="navbar-text">Dashboard</span>
						<ul className="navbar-nav mb-2 mb-lg-0 d-flex">
							<li className="nav-item" onClick={logoutUser}>
								<a
									className="nav-link active"
									aria-current="page"
									href="#"
								>
									Logout
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

export default DashboardInfo;
