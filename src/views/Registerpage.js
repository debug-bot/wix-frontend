import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Registerpage() {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");

	const { registerUser } = useContext(AuthContext);

	console.log(email);
	console.log(username);
	console.log(password);
	console.log(password2);

	const handleSubmit = async (e) => {
		e.preventDefault();
		registerUser(email, username, password, password2);
	};

	return (
		<div>
			<>
				<section
					className="vh-100"
					style={{ backgroundColor: "#9A616D" }}
				>
					<div className="container py-5 h-100">
						<div className="row d-flex justify-content-center align-items-center h-100">
							<div className="col col-xl-10">
								<div
									className="card"
									style={{ borderRadius: "1rem" }}
								>
									<div className="row g-0">
										<div className="col-md-6 col-lg-5 d-none d-md-block">
											<img
												src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
												alt="login form"
												className="img-fluid"
												style={{
													borderRadius:
														"1rem 0 0 1rem",
													height: "100%",
												}}
											/>
										</div>
										<div className="col-md-6 col-lg-7 d-flex align-items-center">
											<div className="card-body p-4 p-lg-5 text-black">
												<form onSubmit={handleSubmit}>
													<div className="d-flex align-items-center mb-3 pb-1">
														<span className="h2 fw-bold mb-0">
															Wix
														</span>
													</div>
													<h5
														className="fw-normal mb-3 pb-3"
														style={{
															letterSpacing: 1,
														}}
													>
														Sign Up
													</h5>
													<div className="form-outline mb-4">
														<input
															type="email"
															id="form2Example17"
															className="form-control form-control-lg"
															placeholder="Email Address"
															onChange={(e) =>
																setEmail(
																	e.target
																		.value
																)
															}
														/>
													</div>
													<div className="form-outline mb-4">
														<input
															type="text"
															id="form2Example17"
															className="form-control form-control-lg"
															placeholder="Full Name"
															onChange={(e) =>
																setUsername(
																	e.target
																		.value
																)
															}
														/>
													</div>
													<div className="form-outline mb-4">
														<input
															type="password"
															id="form2Example17"
															className="form-control form-control-lg"
															placeholder="Password"
															onChange={(e) =>
																setPassword(
																	e.target
																		.value
																)
															}
														/>
													</div>
													<div className="form-outline mb-4">
														<input
															type="password"
															id="form2Example27"
															className="form-control form-control-lg"
															placeholder="Confirm Password"
															onChange={(e) =>
																setPassword2(
																	e.target
																		.value
																)
															}
														/>
													</div>
													<div className="pt-1 mb-4">
														<button
															className="btn btn-dark btn-lg btn-block"
															type="submit"
														>
															Register
														</button>
													</div>
													<a
														className="small text-muted"
														href="#!"
													>
														<Link
															to="/forgotpassword"
															style={{
																color: "#393f81",
															}}
														>
															Forgot password?
														</Link>
													</a>
													<p
														className="pb-lg-2"
														style={{
															color: "#393f81",
														}}
													>
														Already have an account?{" "}
														<Link
															to="/login"
															style={{
																color: "#393f81",
															}}
														>
															Login Now
														</Link>
													</p>
													<a
														href="#!"
														className="small text-muted"
													>
														Terms of use.
													</a>
													<a
														href="#!"
														className="small text-muted"
													>
														Privacy policy
													</a>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</>
		</div>
	);
}

export default Registerpage;
