import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useParams } from "react-router-dom";

function ChangePassword() {
	const { ChangePasswordUser } = useContext(AuthContext);
	const { userId, token } = useParams();

	const handleSubmit = (e) => {
		e.preventDefault();
		const password = e.target.password.value;
		const password2 = e.target.password2.value;

		password.length > 0 &&
			ChangePasswordUser(password, password2, userId, token);
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
														<div className="d-flex align-items-center mb-3 pb-1">
															<span className="h2 fw-bold mb-0">
																Wix
															</span>
														</div>
													</div>
													<h5
														className="fw-normal mb-3 pb-3"
														style={{
															letterSpacing: 1,
														}}
													>
														Change Password
													</h5>
													<div className="form-outline mb-4">
														<input
															type="password"
															id="form2Example17"
															className="form-control form-control-lg"
															name="password"
															placeholder="New Password"
														/>
													</div>
													<div className="form-outline mb-4">
														<input
															type="password"
															id="form2Example27"
															className="form-control form-control-lg"
															name="password2"
															placeholder="Confirm Password"
														/>
													</div>
													<div className="pt-1 mb-4">
														<button
															className="btn btn-dark btn-lg btn-block"
															type="submit"
														>
															Change Password
														</button>
													</div>
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

export default ChangePassword;
