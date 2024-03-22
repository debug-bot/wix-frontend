import { useContext } from "react";
import Link from "next/link";
import AuthContext from "../context/AuthContext";


function Loginpage() {
	const { loginUser } = useContext(AuthContext);
	const handleSubmit = (e) => {
		e.preventDefault();
		const email = e.target.email.value;
		const password = e.target.password.value;

		email.length > 0 && loginUser(email, password);

		console.log(email);
		console.log(password);
	};

	return (
		<div>
			<>
				<section
					className="vh-100 bg-light"
					
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
														{/* <div className="d-flex align-items-center mb-3 pb-1">
															<i
																className="fas fa-cubes fa-2x me-3"
																style={{
																	color: "#ff6219",
																}}
															/>
															
														</div> */}
														 <Link href="/">
														<span className="h2 fw-bold mb-0">
															Market Master
														</span>
                                                        </Link>
													</div>
													<h5
														className="fw-normal mb-3 pb-3"
														style={{
															letterSpacing: 1,
														}}
													>
														Sign into your account
													</h5>
													<div className="form-outline mb-4">
														<input
															type="email"
															id="form2Example17"
															className="form-control form-control-lg"
															name="email"
															placeholder="Email Address"
														/>
													</div>
													<div className="form-outline mb-4">
														<input
															type="password"
															id="form2Example27"
															className="form-control form-control-lg"
															name="password"
															placeholder="Password"
														/>
													</div>
													<div className="pt-1 mb-4">
														<button
															className="btn btn-dark btn-lg btn-block"
															type="submit"
														>
															Login
														</button>
													</div>

											
													<p
														className="pb-lg-2"
														style={{
															color: "#393f81",
														}}
													>
														Don't have an account?{" "}
														<Link
															href="/register"
															style={{
																color: "#393f81",
															}}
														>
															Register Now
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

export default Loginpage;
