import { useState } from "react";
import Link from "next/link";
import DashboardInfo from "../components/DashboardInfo";
import Templates from "../components/Templates";
import Head from "next/head";

export default function DashboardTemplates() {
	const [isSidebarActive, setIsSidebarActive] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarActive(!isSidebarActive);
	};

	return (
		<>
			<Head>
				<style>
					{`
                    #navbarSupportedContent {
                        visibility: visible;
                    }

                    .navb-text {
                        display: flex;
                        align-items: center;

                        
                    }

                    @media (max-width: 768px) {
                        #navbarSupportedContent {
                            visibility: hidden;
                        }
                    }
                    `}
				</style>
			</Head>
			<div className="main-container d-flex">
				<div
					class={`sidebar ${isSidebarActive ? "active" : ""}`}
					id="side_nav"
				>
					<div class="header-box px-2 pt-3 pb-4 d-flex justify-content-between">
						<h1 class="fs-4 navb-text">
							<span class="bg-white text-dark rounded shadow px-2 me-2">
								<img
									className="img-fluid"
									width="50px"
									style={{ cursor: "pointer" }}
									src="./logos/mylogo.png"
									alt="..."
								/>
							</span>{" "}
							<span class="text-white">Market Master</span>
						</h1>
						<button
							class="btn d-md-none d-block close-btn px-1 py-0 text-white"
							onClick={toggleSidebar}
						>
							<i class="fa-solid fa-stream"></i>
						</button>
					</div>

					<ul class="list-unstyled px-2">
						<Link href="/mysite">
							<li class="">
								<a
									href="#"
									class="text-decoration-none px-3 py-2 d-block mb-2"
								>
									<i class="fa-solid fa-home me-1"></i> My
									Sites
								</a>
							</li>
						</Link>
						<Link href="/templates">
							<li class="active">
								<a
									href="#"
									class="text-decoration-none px-3 py-2 d-block"
								>
									<i class="fa-solid fa-boxes-stacked"></i>{" "}
									Templates
								</a>
							</li>
						</Link>
						<hr class="text-white bg-white" />
					</ul>
				</div>
				<div class="content">
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
								<DashboardInfo />
							</div>
						</div>
					</nav>

					<div class="dashboard-content px-3 pb-3">
						<Templates loggedIn={true} />
					</div>
				</div>
			</div>
		</>
	);
}
