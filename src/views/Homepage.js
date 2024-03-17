import React from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

function Homepage() {
	const navigate = useNavigate();
	const token = localStorage.getItem("authTokens");

	return (
		<div>
			<Navbar />
			<>
				<main role="madin" style={{ marginTop: 50 }}>
					{/* Main jumbotron for a primary marketing message or call to action */}
					<div className="jumbotron">
						<div className="container">
							<h1 className="display-3">Hello!</h1>
							<p>
								{/* website builder text */}
                Welcome to Wix, the easiest way to build your website.
							</p>
							<p>
								{token ? (
									<>
										<a
											className="btn btn-dark btn-lg"
											href="#"
											role="button"
											onClick={() =>
												navigate("/dashboard")
											}
										>
											Go to Dashboard
										</a>
									</>
								) : (
									<>
										<a
											className="btn btn-dark btn-lg"
											href="#"
											role="button"
											onClick={() =>
												navigate("/register")
											}
										>
											Get Started
										</a>
									</>
								)}
							</p>
						</div>
					</div>

					{/* /container */}
				</main>
			</>
		</div>
	);
}

export default Homepage;
