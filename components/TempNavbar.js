import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import Head from "next/head";

const TempNavbar = () => {
	const [profile, setProfile] = useState("");
	const { user, logoutUser } = useContext(AuthContext);
	const api = useAxios();

	useEffect(() => {
		if (user) {
			const fetchData = async () => {
				try {
					const response = await api.get("/account/profile/");
					setProfile(response.data);
					console.log(response.data);
				} catch (error) {
					console.log(error);
					setProfile("Something went wrong");
				}
			};
			fetchData();
		}
	}, [user]);

	return (
		<>
			<Head>
				<style>
					{`
                    #navbarText {
                        visibility: visible;
                    }

                    .navbar-brand {
                        display: flex;
                        align-items: center;

                        
                    }

                    @media (max-width: 768px) {
                        #navbarText {
                            visibility: hidden;
                        }
                    }
                    `}
				</style>
			</Head>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container">
					<a className="navbar-brand mt-1" href="/">
						<img
							className="img-fluid"
							width="50px"
							style={{ cursor: "pointer" }}
							src="./logos/mylogo.png"
							alt="..."
						/>
						<span className="ms-2 mb-2">Market Master</span>
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarText"
						aria-controls="navbarText"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarText">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-3">
							<li className="nav-item">
								<a
									className="nav-link"
									aria-current="page"
									href="#features"
								>
									Features
								</a>
							</li>

							<li className="nav-item">
								<a
									className="nav-link"
									aria-current="page"
									href="#templates"
								>
									Templates
								</a>
							</li>
							<li className="nav-item">
								<a
									className="nav-link"
									aria-current="page"
									href="#faqse"
								>
									FAQs
								</a>
							</li>

							{user ? (
								<>
									<li className="nav-item">
										<a
											className="nav-link"
											href="#"
											onClick={logoutUser}
										>
											Logout
										</a>
									</li>
								</>
							) : (
								<>
									<li className="nav-item">
										<Link href="/login/">
											<a className="nav-link" href="#">
												Login
											</a>
										</Link>
									</li>
									<li className="nav-item">
										<Link href="/register/">
											<a className="nav-link" href="#">
												Register
											</a>
										</Link>
									</li>
								</>
							)}
						</ul>
						<Link href="/mysite">
							<span className="navbar-text cursor-pointer">
								{user && profile.name}
							</span>
						</Link>
					</div>
				</div>
			</nav>
		</>
	);
};

export default TempNavbar;
